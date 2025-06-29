import { type Component } from "solid-js";

interface EmbeddedHtmlProps {
  t?: any;
  windowWidth?: number;
  windowHeight?: number;
}

const EmbeddedHtml: Component<EmbeddedHtmlProps> = (props) => {
  return (
    <div 
      style={{
        width: '800px',
        height: '600px',
        background: '#ff0000', // Bright red background to test visibility
        color: 'white',
        padding: '20px',
        'box-sizing': 'border-box',
        'font-family': 'Arial, sans-serif',
        overflow: 'hidden'
      }}
    >
      <h1 style={{ 
        'font-size': '32px', 
        margin: '0 0 20px 0',
        'text-align': 'center'
      }}>
        LOREM IPSUM TEST
      </h1>
      
      <div style={{
        background: '#00ff00', // Bright green
        color: 'black',
        padding: '15px',
        margin: '10px 0',
        'border-radius': '5px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', 'font-size': '24px' }}>Green Section</h2>
        <p style={{ margin: '0', 'font-size': '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div style={{
        background: '#0000ff', // Bright blue
        color: 'white',
        padding: '15px',
        margin: '10px 0',
        'border-radius': '5px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', 'font-size': '24px' }}>Blue Section</h2>
        <p style={{ margin: '0', 'font-size': '16px' }}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div style={{
        background: '#ffff00', // Bright yellow
        color: 'black',
        padding: '15px',
        margin: '10px 0',
        'border-radius': '5px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', 'font-size': '24px' }}>Yellow Section</h2>
        <p style={{ margin: '0', 'font-size': '16px' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export default EmbeddedHtml;