const map = L.map("map").setView([51.0447, -114.0719], 11)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map)

const drawnItems = new L.FeatureGroup()
map.addLayer(drawnItems)

let originalLines = []
let simplifiedLines = []

const drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polyline: {
            shapeOptions: {
                color: "#2563eb",
                weight: 4
            }
        }
    },
    edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false
    }
})

map.addControl(drawControl)

map.on(L.Draw.Event.CREATED, function (e) {
    const newLine = e.layer
    originalLines.push(newLine)
    simplifiedLines.push(null)
    drawnItems.addLayer(newLine)
})

document.getElementById("simplify-btn").addEventListener("click", function () {
    if (originalLines.length === 0) {
        alert("Please draw a polyline first.")
        return
    }

    let indexToSimplify = -1

    for (let i = originalLines.length - 1; i >= 0; i--) {
        if (simplifiedLines[i] === null) {
            indexToSimplify = i
            break
        }
    }

    if (indexToSimplify === -1) {
        alert("All drawn lines have already been simplified.")
        return
    }

    const currentLine = originalLines[indexToSimplify]
    const latlngs = currentLine.getLatLngs()
    const coordinates = latlngs.map(point => [point.lng, point.lat])

    if (coordinates.length < 2) {
        alert("The line needs at least two points.")
        return
    }

    const lineGeoJSON = turf.lineString(coordinates)

    const simplifiedGeoJSON = turf.simplify(lineGeoJSON, {
        tolerance: 0.001,
        highQuality: true
    })

    const simplifiedCoords = simplifiedGeoJSON.geometry.coordinates.map(coord => [coord[1], coord[0]])

    const newSimplifiedLine = L.polyline(simplifiedCoords, {
        color: "red",
        weight: 4,
        dashArray: "8, 8"
    })

    simplifiedLines[indexToSimplify] = newSimplifiedLine
    drawnItems.addLayer(newSimplifiedLine)
})

document.getElementById("clear-btn").addEventListener("click", function () {
    if (originalLines.length === 0) {
        alert("There are no lines to clear.")
        return
    }

    const lastOriginalLine = originalLines.pop()
    const lastSimplifiedLine = simplifiedLines.pop()

    drawnItems.removeLayer(lastOriginalLine)

    if (lastSimplifiedLine) {
        drawnItems.removeLayer(lastSimplifiedLine)
    }
})