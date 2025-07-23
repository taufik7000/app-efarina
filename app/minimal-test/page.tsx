export default function MinimalTest() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Minimal Test (Inline Styles)
      </h1>
      
      {/* Test Tailwind */}
      <div className="bg-blue-500 text-white p-4 mb-4 rounded">
        Tailwind Test: This should have blue background
      </div>
      
      {/* Test CSS Variables */}
      <div className="bg-primary text-primary-foreground p-4 mb-4 rounded">
        CSS Variables Test: This should use primary colors
      </div>
      
      {/* Test Basic Button */}
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Basic Button Test
      </button>
    </div>
  )
}