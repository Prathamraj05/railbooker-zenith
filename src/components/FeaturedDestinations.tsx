
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/lib/mockData";

const FeaturedDestinations = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleExplore = (destination: string) => {
    navigate(`/search?from=&to=${destination}&date=${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover India's vibrant cities and cultural hotspots with our convenient train routes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="group rounded-xl overflow-hidden shadow-glass hover:shadow-elevated-hover transition-all duration-500 ease-out transform hover:-translate-y-1 bg-white"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative h-64 overflow-hidden blur-load ${imagesLoaded[destination.id] ? 'loaded' : ''}`}
                style={{ backgroundImage: `url(${destination.image}?blur=200&w=100&quality=10)` }}
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-110"
                  onLoad={() => handleImageLoad(destination.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full mb-2">
                    Popular Destination
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {destination.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="group px-0 text-rail hover:text-rail-dark hover:bg-transparent"
                  onClick={() => handleExplore(destination.name)}
                >
                  <span className="mr-2">Explore trains</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
