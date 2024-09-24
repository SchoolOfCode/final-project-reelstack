// export default function Header() {
//     return (
//       <header>
//         <h1>📽️Reel Magic📽️</h1>
//         <button aria-label="Search" className="search-button">
//         <svg className="h-8 w-8 text-rose-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
//         </button>
//       </header>
//     )
//   }

import './Header.module.css'; // Ensure this line is present

export default function Header() {
    return (
        <header>
            <h1>📽️Reel Magic📽️</h1>
            <button aria-label="Search" className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </button>
        </header>
    );
}