export default function ProductLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}


export async function generateMetadata({ params }) {
    // Assuming you have an API URL set in your environment variables
    const apiUrl = process.env.NEXTAUTH_URL  // Set default URL for local dev
    try{
      const res = await fetch(`${apiUrl}/api/product?id=${params.id}`);
    if (res.status === 200) {
      const data = await res.json();
      return {
        title: `${data.data.name} | Common Sift`,
        description: `Explore the details of ${data.data.name}.`,
      };
    } else {
      return {
        title: 'Error | Common Sift',
        description: 'Unable to fetch product details.',
      };
    }
    }catch(e){
      return {
        title: 'Error | Common Sift',
        description: 'Unable to fetch product details.',
      };
    }
    
  }
  