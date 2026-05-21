import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function Map({clicksData}) {
    const position = [51.505, -0.09]

    const clicks = clicksData.filter(click => click.lat !== null)

    

    let DefaultIcon = L.icon({
        iconUrl: '/icons/marker-icon.png',
        shadowUrl: '/icons/marker-shadow.png',
        iconAnchor: [12, 41]
    })

    L.Marker.mergeOptions({ icon: DefaultIcon })
    
    return (
        <div className="h-[400px] w-full">
            <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {clicks.map((click) => (
                    <Marker key={click.id} position={[click.lat, click.lon]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))}
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

            </MapContainer>
            
        </div>
    );
}
export default Map