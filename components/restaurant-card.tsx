import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RestaurantSummary } from "@/domain/domain";

interface RestaurantCardProps {
  restaurant: RestaurantSummary;
}

const getImage = (restaurant: RestaurantSummary) => {
  const photoUrl = restaurant.photos?.[0]?.url;

  if (!photoUrl) {
    return null;
  }

  if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
    return photoUrl;
  }

  if (photoUrl.startsWith("/api/photos/")) {
    return photoUrl;
  }

  return `/api/photos/${photoUrl}`;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const city = restaurant.address?.city || "Unknown city";
  const country = restaurant.address?.country || "Unknown country";
  const rating = Math.round(restaurant.averageRating ?? 0);
  const imageSrc = getImage(restaurant);

  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <p className="font-medium">{restaurant.name}</p>
              <p className="text-sm text-muted-foreground">
                {city}, {country}
              </p>
            </div>
          </div>

          <div className="aspect-[4/3] relative mb-4 bg-muted rounded-md overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>

          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {restaurant.cuisineType} Cuisine
          </p>

          <div className="flex justify-between border-t pt-4">
            <button
              type="button"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}