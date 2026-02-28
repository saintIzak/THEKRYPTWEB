import { useState, useCallback, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Search, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface MapPickerProps {
  onLocationSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
  initialAddress?: string;
}

const MapComponent = ({ onLocationSelect, initialAddress }: MapPickerProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || '');
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    // Center on Nairobi, Kenya
    const nairobiCenter = { lat: -1.2921, lng: 36.8219 };

    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: nairobiCenter,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [{ "color": "#18181b" }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#71717a" }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#18181b" }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#27272a" }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#18181b" }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#18181b" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#27272a" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{ "color": "#3f3f46" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#09090b" }]
        }
      ]
    });

    const newMarker = new google.maps.Marker({
      position: nairobiCenter,
      map: newMap,
      draggable: true,
      title: 'DEPLOYMENT ZONE',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#dc2626",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#ffffff",
      }
    });

    // Geocoder for reverse geocoding
    const geocoder = new google.maps.Geocoder();

    // Handle marker drag
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position) {
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            const address = results[0].formatted_address;
            setSelectedAddress(address);
            onLocationSelect(address, {
              lat: position.lat(),
              lng: position.lng(),
            });
          }
        });
      }
    });

    // Handle map click
    newMap.addListener('click', (event: google.maps.MapMouseEvent) => {
      const position = event.latLng;
      if (position) {
        newMarker.setPosition(position);
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            const address = results[0].formatted_address;
            setSelectedAddress(address);
            onLocationSelect(address, {
              lat: position.lat(),
              lng: position.lng(),
            });
          }
        });
      }
    });

    setMap(newMap);
    setMarker(newMarker);
  }, [onLocationSelect]);

  const searchLocation = () => {
    if (!map || !searchQuery.trim()) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: searchQuery + ', Nairobi, Kenya'
    }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const location = results[0].geometry.location;
        const address = results[0].formatted_address;

        map.setCenter(location);
        map.setZoom(15);

        if (marker) {
          marker.setPosition(location);
        }

        setSelectedAddress(address);
        onLocationSelect(address, {
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH SECTOR COORDINATES..."
            className="pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase tracking-widest text-xs h-12"
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
          />
        </div>
        <Button type="button" onClick={searchLocation} variant="outline" className="h-12 px-6 border-zinc-800 hover:border-red-600">
          SCAN
        </Button>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-64 sm:h-80 border-2 border-zinc-800 bg-zinc-950 relative overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' }}
        onLoad={initMap}
      >
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <div className="flex flex-col gap-1">
            <div className="h-1 w-8 bg-red-600" />
            <div className="h-1 w-4 bg-red-600/50" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[8px] font-black text-red-600/50 uppercase tracking-widest">
          GPS_SIGNAL_LOCKED
        </div>
      </div>

      {/* Selected Address */}
      {selectedAddress && (
        <div className="bg-red-600/5 border border-red-600/20 p-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <Target className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">TARGET COORDINATES LOCKED:</p>
              <p className="text-xs font-black text-white uppercase mt-1">{selectedAddress}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest text-center">
        INTERACT WITH THE GRID OR DRAG THE MARKER TO DESIGNATE DEPLOYMENT ZONE.
      </p>
    </div>
  );
};

export default function MapPicker(props: MapPickerProps) {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      render={(status) => {
        if (status === 'LOADING') return (
          <div className="h-80 bg-zinc-950 border-2 border-zinc-800 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent animate-spin" />
            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">INITIALIZING SAT-LINK...</p>
          </div>
        );
        if (status === 'FAILURE') return (
          <div className="h-80 bg-zinc-950 border-2 border-red-900/20 flex flex-col items-center justify-center space-y-4">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">SAT-LINK INTERFERENCE DETECTED</p>
          </div>
        );
        return <MapComponent {...props} />;
      }}
    />
  );
}