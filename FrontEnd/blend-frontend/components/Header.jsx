import Link from 'next/link';

const Header = () => {
  const pages = ['mindmap', 'prospects'];

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-mono font-bold tracking-widest">BLEND</Link>
        <nav>
          <ul className="flex space-x-4">
            {pages.map((page) => (
              <li key={page}>
                <Link href={`/${page}`} className="hover:underline">{page}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
