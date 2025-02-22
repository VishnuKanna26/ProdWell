// frontend/src/components/Loader.js

  export default function Loader({ size = 'medium' }) {
    const sizes = {
      small: 'h-5 w-5',
      medium: 'h-8 w-8',
      large: 'h-12 w-12'
    };
  
    return (
      <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizes[size]}`}>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }