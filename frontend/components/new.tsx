// import React, { useEffect, useRef } from "react";

// function MyComponent() {
//   const photokitRef = useRef(null);

// //   useEffect(() => {
// //     const fetchImageAndSend = async () => {
// //       try {
// //         // Fetch the image data from the URL
// //         const response = await fetch(
// //           "https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/Clothing%20and%20Bags/Men's%20Embroidered%20Polo%20T-Shirts/IN_Men_s-Embroidered-Polo-T-Shirts_Hero-image_01"
// //         );
// //         const blob = await response.blob();

// //         // Convert the image blob to base64
// //         const reader = new FileReader();

// //         reader.onload = () => {
// //           // Send the message to the photokit iframe's content window if photokitRef.current is not null
// //           if (photokitRef.current) {
// //             (
// //               photokitRef.current as HTMLIFrameElement
// //             ).contentWindow?.postMessage(onmessage, "*");
// //           }
// //         };

// //         reader.readAsDataURL(blob);
// //       } catch (error) {
// //         console.error("Error fetching or converting image:", error);
// //       }
// //     };

// //     fetchImageAndSend();
// //   }, []); // Empty dependency array means this effect runs only once after the initial render

//   return (
//     // Render the iframe with the ref
//     <iframe
//       ref={photokitRef}
//       src="https://photokit.com/editor/?lang=en"
//       // Optionally hide the iframe if it shouldn't be visible
//     />
//   );
// }

// export default MyComponent;
