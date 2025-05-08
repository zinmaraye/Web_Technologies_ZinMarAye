import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState<string[]>([]);  // Updated type to string array for images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch gallery data from the API
    axios.get('http://localhost:8000/api/donation/gallery/list')
      .then((response) => {
        // Check if the response contains data and status
        if (response.data.status) {
          // Parse the 'image' field (which is a JSON string) into an array
          const images = response.data.data.map((item: { image: string }) => {
            try {
              // Parse image string and handle potential errors
              return JSON.parse(item.image);
            } catch (err) {
              console.error("Error parsing image JSON:", err);
              return [];
            }
          });
          
          // Flatten the array of images (since each item contains an array of images)
          const allImages = images.flat();
          setGalleryData(allImages);
        } else {
          setError('Failed to fetch gallery data');
        }
      })
      .catch((error) => {
        console.error('Error fetching gallery data:', error);
        setError(`Error fetching data: ${error.response ? error.response.data.message : error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Display loading message while fetching
  if (loading) {
    return <div>Loading gallery...</div>;
  }

  // Display error message if an error occurred
  if (error) {
    return <div>{error}</div>;
  }

  // Render the gallery images
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Blood Donation Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryData.length > 0 ? (
            galleryData.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  // Ensure the correct image path with 'storage' folder URL
                  src={`http://localhost:8000/images/donation/gallery/${image}`} // Assuming images are in 'storage' folder
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <div>No images available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
