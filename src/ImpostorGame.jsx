import React, { useState } from 'react';
import { Shuffle, Eye, EyeOff, RotateCcw, Users } from 'lucide-react';

const ImpostorGame = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, reveal
  const [numPlayers, setNumPlayers] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [wordRevealed, setWordRevealed] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [partyMode, setPartyMode] = useState(false);
  const [impostorWon, setImpostorWon] = useState(null);
  
  const prendas = [
    '🍺 Tomar un shot',
    '🍻 Hacer fondo blanco',
    '💃 Bailar 30 segundos',
    '🎤 Cantar una canción',
    '🤪 Hacer 10 sentadillas',
    '😂 Contar un chiste',
    '🎭 Imitar a alguien del grupo',
    '📱 Mostrar la última foto de tu galería',
    '🙈 Verdad o reto',
    '🎲 El grupo decide tu prenda',
    '🍷 Tomar dos shots',
    '🤸 Hacer una flexión',
    '😝 Hablar con acento por 1 minuto',
    '🎵 Cantar el estribillo de una canción',
    '🤝 Dar un abrazo a todos',
    '📞 Llamar a alguien y decir "te extraño"',
    '🍕 Pagar la próxima ronda',
    '😎 Usar lentes de sol hasta la próxima ronda',
    '🎪 Hacer un truco de magia',
    '🏃 Correr alrededor de la mesa'
  ];
  
  const wordPackages = {
    deportistas: {
      name: 'Deportistas',
      icon: '⚽',
      color: 'from-green-500 to-emerald-600',
      words: [
        'Lionel Messi', 'Cristiano Ronaldo', 'LeBron James', 'Roger Federer',
        'Serena Williams', 'Usain Bolt', 'Michael Jordan', 'Neymar',
        'Rafael Nadal', 'Tiger Woods', 'Tom Brady', 'Novak Djokovic',
        'Kylian Mbappé', 'Lewis Hamilton', 'Stephen Curry', 'Mike Tyson',
        'Muhammad Ali', 'Pelé', 'Diego Maradona', 'Simone Biles',
        'Kobe Bryant', 'Shaquille O\'Neal', 'David Beckham', 'Zinedine Zidane',
        'Ronaldinho', 'Wayne Gretzky', 'Michael Phelps', 'Floyd Mayweather',
        'Conor McGregor', 'Naomi Osaka', 'Simona Halep', 'Andy Murray',
        'Kevin Durant', 'Giannis Antetokounmpo', 'Luka Dončić', 'Karim Benzema',
        'Erling Haaland', 'Virat Kohli', 'Sachin Tendulkar', 'MS Dhoni',
        'Rohit Sharma', 'AB de Villiers', 'Shane Warne', 'Ricky Ponting',
        'Carl Lewis', 'Jesse Owens', 'Jackie Joyner-Kersee', 'Eliud Kipchoge',
        'Katie Ledecky', 'Caeleb Dressel', 'Nadia Comăneci', 'Kohei Uchimura',
        'Magic Johnson', 'Larry Bird', 'Wilt Chamberlain', 'Kareem Abdul-Jabbar',
        'Allen Iverson', 'Charles Barkley', 'Tim Duncan', 'Dirk Nowitzki',
        'Dwyane Wade', 'Carmelo Anthony', 'Chris Paul', 'James Harden',
        'Kawhi Leonard', 'Anthony Davis', 'Damian Lillard', 'Kyrie Irving',
        'Manny Pacquiao', 'Sugar Ray Leonard', 'Oscar De La Hoya', 'Joe Frazier',
        'George Foreman', 'Evander Holyfield', 'Julio César Chávez', 'Canelo Álvarez',
        'Valentino Rossi', 'Marc Márquez', 'Max Verstappen', 'Sebastian Vettel',
        'Fernando Alonso', 'Ayrton Senna', 'Michael Schumacher', 'Nico Rosberg',
        'Alex Morgan', 'Megan Rapinoe', 'Marta Vieira da Silva', 'Sam Kerr',
        'Alexia Putellas', 'Ada Hegerberg', 'Mia Hamm', 'Abby Wambach',
        'Andrés Iniesta', 'Xavi Hernández', 'Sergio Ramos', 'Luka Modrić',
        'Toni Kroos', 'N\'Golo Kanté', 'Kevin De Bruyne', 'Mohamed Salah',
        'Harry Kane', 'Robert Lewandowski', 'Luis Suárez', 'Sergio Agüero'
      ]
    },
    celebridades: {
      name: 'Celebridades',
      icon: '🌟',
      color: 'from-yellow-500 to-orange-600',
      words: [
        'Taylor Swift', 'Beyoncé', 'Kim Kardashian', 'Dwayne Johnson',
        'Jennifer Lopez', 'Brad Pitt', 'Angelina Jolie', 'Leonardo DiCaprio',
        'Oprah Winfrey', 'Tom Cruise', 'Will Smith', 'Rihanna',
        'Lady Gaga', 'Johnny Depp', 'Scarlett Johansson', 'Robert Downey Jr',
        'Emma Watson', 'Chris Hemsworth', 'Zendaya', 'Ryan Reynolds',
        'Jennifer Lawrence', 'Meryl Streep', 'Denzel Washington', 'Morgan Freeman',
        'Tom Hanks', 'Sandra Bullock', 'Julia Roberts', 'George Clooney',
        'Matt Damon', 'Ben Affleck', 'Charlize Theron', 'Nicole Kidman',
        'Hugh Jackman', 'Christian Bale', 'Anne Hathaway', 'Natalie Portman',
        'Emma Stone', 'Ryan Gosling', 'Chris Evans', 'Chris Pratt',
        'Mark Wahlberg', 'Vin Diesel', 'Jason Statham', 'Gal Gadot',
        'Margot Robbie', 'Amy Adams', 'Jessica Chastain', 'Cate Blanchett',
        'Kate Winslet', 'Reese Witherspoon', 'Cameron Diaz', 'Gwyneth Paltrow',
        'Matthew McConaughey', 'Jake Gyllenhaal', 'Joaquin Phoenix', 'Adam Sandler',
        'Kevin Hart', 'Dave Chappelle', 'Chris Rock', 'Ellen DeGeneres',
        'Jimmy Fallon', 'Jimmy Kimmel', 'Stephen Colbert', 'Conan O\'Brien',
        'Trevor Noah', 'John Oliver', 'Seth Meyers', 'James Corden',
        'Timothée Chalamet', 'Florence Pugh', 'Saoirse Ronan', 'Anya Taylor-Joy',
        'Tom Holland', 'Zendaya Coleman', 'Millie Bobby Brown', 'Finn Wolfhard',
        'Keanu Reeves', 'Idris Elba', 'Chadwick Boseman', 'Michael B. Jordan',
        'Lupita Nyong\'o', 'Viola Davis', 'Octavia Spencer', 'Kerry Washington',
        'Samuel L. Jackson', 'Harrison Ford', 'Sigourney Weaver', 'Helen Mirren',
        'Judi Dench', 'Ian McKellen', 'Patrick Stewart', 'Anthony Hopkins',
        'Al Pacino', 'Robert De Niro', 'Jack Nicholson', 'Clint Eastwood',
        'Arnold Schwarzenegger', 'Sylvester Stallone', 'Bruce Willis', 'Jackie Chan'
      ]
    },
    musicos: {
      name: 'Músicos',
      icon: '🎵',
      color: 'from-purple-500 to-pink-600',
      words: [
        'Michael Jackson', 'Madonna', 'Elvis Presley', 'The Beatles',
        'Freddie Mercury', 'Adele', 'Ed Sheeran', 'Shakira',
        'Drake', 'Ariana Grande', 'Justin Bieber', 'Billie Eilish',
        'Bad Bunny', 'Coldplay', 'Queen', 'Eminem',
        'Bob Marley', 'David Bowie', 'Prince', 'Bruno Mars',
        'Whitney Houston', 'Mariah Carey', 'Celine Dion', 'Britney Spears',
        'Lady Gaga', 'Katy Perry', 'Selena Gomez', 'Demi Lovato',
        'Miley Cyrus', 'Pink', 'Rihanna', 'Nicki Minaj',
        'Cardi B', 'Megan Thee Stallion', 'Dua Lipa', 'The Weeknd',
        'Post Malone', 'Travis Scott', 'Kendrick Lamar', 'J. Cole',
        'Jay-Z', 'Kanye West', 'Snoop Dogg', 'Dr. Dre',
        'Tupac Shakur', 'The Notorious B.I.G.', '50 Cent', 'Lil Wayne',
        'Metallica', 'AC/DC', 'Guns N\' Roses', 'Nirvana',
        'Led Zeppelin', 'Pink Floyd', 'The Rolling Stones', 'U2',
        'Radiohead', 'Red Hot Chili Peppers', 'Foo Fighters', 'Green Day',
        'Linkin Park', 'Imagine Dragons', 'Twenty One Pilots', 'Maroon 5',
        'OneRepublic', 'The Chainsmokers', 'Calvin Harris', 'David Guetta',
        'Avicii', 'Marshmello', 'Tiësto', 'Martin Garrix',
        'Elton John', 'Billy Joel', 'Stevie Wonder', 'Paul McCartney',
        'John Lennon', 'George Harrison', 'Ringo Starr', 'Bob Dylan',
        'Bruce Springsteen', 'Frank Sinatra', 'Aretha Franklin', 'Ray Charles',
        'Louis Armstrong', 'Ella Fitzgerald', 'Nina Simone', 'Tina Turner',
        'Cher', 'Dolly Parton', 'Shania Twain', 'Garth Brooks',
        'BTS', 'BLACKPINK', 'EXO', 'TWICE', 'Rosalía', 'Ozuna',
        'J Balvin', 'Maluma', 'Daddy Yankee', 'Luis Fonsi'
      ]
    },
    animales: {
      name: 'Animales',
      icon: '🦁',
      color: 'from-blue-500 to-cyan-600',
      words: [
        'León', 'Elefante', 'Tigre', 'Jirafa',
        'Delfín', 'Águila', 'Panda', 'Koala',
        'Pingüino', 'Canguro', 'Gorila', 'Ballena',
        'Tiburón', 'Cocodrilo', 'Oso Polar', 'Leopardo',
        'Hipopótamo', 'Cebra', 'Rinoceronte', 'Búho',
        'Lobo', 'Zorro', 'Oso Pardo', 'Oso Negro',
        'Jaguar', 'Guepardo', 'Lince', 'Pantera',
        'Puma', 'Hiena', 'Chacal', 'Coyote',
        'Venado', 'Alce', 'Reno', 'Bisonte',
        'Búfalo', 'Camello', 'Dromedario', 'Llama',
        'Alpaca', 'Cabra Montés', 'Oveja', 'Antílope',
        'Gacela', 'Ñu', 'Okapi', 'Tapir',
        'Jabalí', 'Cerdo Salvaje', 'Mapache', 'Tejón',
        'Nutria', 'Castor', 'Ardilla', 'Marmota',
        'Puercoespín', 'Erizo', 'Armadillo', 'Oso Hormiguero',
        'Perezoso', 'Murciélago', 'Mono Araña', 'Chimpancé',
        'Orangután', 'Mandril', 'Babuino', 'Lémur',
        'Suricata', 'Foca', 'Morsa', 'León Marino',
        'Orca', 'Cachalote', 'Beluga', 'Narval',
        'Manatí', 'Dugongo', 'Pulpo', 'Calamar',
        'Medusa', 'Estrella de Mar', 'Erizo de Mar', 'Tortuga Marina',
        'Cocodrilo del Nilo', 'Caimán', 'Iguana', 'Dragón de Komodo',
        'Serpiente Pitón', 'Anaconda', 'Cobra', 'Víbora',
        'Camaleón', 'Salamandra', 'Rana', 'Sapo',
        'Flamenco', 'Pelícano', 'Cóndor', 'Halcón'
      ]
    },
    paises: {
      name: 'Países',
      icon: '🌍',
      color: 'from-red-500 to-rose-600',
      words: [
        'Argentina', 'Brasil', 'México', 'España',
        'Francia', 'Italia', 'Alemania', 'Reino Unido',
        'Estados Unidos', 'Canadá', 'China', 'Japón',
        'Corea del Sur', 'India', 'Rusia', 'Australia',
        'Nueva Zelanda', 'Sudáfrica', 'Egipto', 'Marruecos',
        'Chile', 'Colombia', 'Perú', 'Venezuela',
        'Ecuador', 'Uruguay', 'Paraguay', 'Bolivia',
        'Costa Rica', 'Panamá', 'Cuba', 'República Dominicana',
        'Puerto Rico', 'Jamaica', 'Haití', 'Guatemala',
        'Honduras', 'El Salvador', 'Nicaragua', 'Belice',
        'Portugal', 'Grecia', 'Turquía', 'Suiza',
        'Austria', 'Bélgica', 'Países Bajos', 'Suecia',
        'Noruega', 'Dinamarca', 'Finlandia', 'Islandia',
        'Irlanda', 'Polonia', 'República Checa', 'Hungría',
        'Rumania', 'Bulgaria', 'Croacia', 'Serbia',
        'Ucrania', 'Bielorrusia', 'Estonia', 'Letonia',
        'Lituania', 'Eslovaquia', 'Eslovenia', 'Albania',
        'Tailandia', 'Vietnam', 'Indonesia', 'Filipinas',
        'Malasia', 'Singapur', 'Camboya', 'Laos',
        'Myanmar', 'Brunéi', 'Timor Oriental', 'Papúa Nueva Guinea',
        'Pakistán', 'Bangladés', 'Sri Lanka', 'Nepal',
        'Bután', 'Maldivas', 'Afganistán', 'Irán',
        'Irak', 'Arabia Saudita', 'Emiratos Árabes', 'Kuwait',
        'Catar', 'Bahréin', 'Omán', 'Yemen',
        'Jordania', 'Líbano', 'Siria', 'Israel',
        'Palestina', 'Kenia', 'Tanzania', 'Uganda'
      ]
    },
    peliculas: {
      name: 'Películas',
      icon: '🎬',
      color: 'from-indigo-500 to-purple-600',
      words: [
        'Titanic', 'Avatar', 'Star Wars', 'El Padrino',
        'Jurassic Park', 'Harry Potter', 'El Señor de los Anillos', 'Toy Story',
        'Forrest Gump', 'Matrix', 'Inception', 'Interestelar',
        'Gladiador', 'Volver al Futuro', 'Pulp Fiction', 'El Rey León',
        'Frozen', 'Buscando a Nemo', 'Shrek', 'Los Increíbles',
        'Coco', 'Up', 'WALL-E', 'Ratatouille',
        'Moana', 'Enredados', 'Valiente', 'La Bella y la Bestia',
        'Aladdin', 'La Sirenita', 'Mulan', 'Pocahontas',
        'Hércules', 'Tarzán', 'El Jorobado de Notre Dame', 'Bambi',
        'Dumbo', 'Pinocho', 'Blancanieves', 'La Cenicienta',
        'La Bella Durmiente', 'Peter Pan', 'Alicia en el País de las Maravillas', '101 Dálmatas',
        'Rocky', 'Rambo', 'Terminator', 'Alien',
        'Depredador', 'Robocop', 'Die Hard', 'Arma Mortal',
        'Los Vengadores', 'Iron Man', 'Capitán América', 'Thor',
        'Black Panther', 'Guardianes de la Galaxia', 'Spider-Man', 'Batman',
        'Superman', 'Wonder Woman', 'Aquaman', 'Flash',
        'Joker', 'El Caballero de la Noche', 'Man of Steel', 'Deadpool',
        'X-Men', 'Wolverine', 'Pantera Negra', 'Doctor Strange',
        'Ant-Man', 'Capitana Marvel', 'Shang-Chi', 'Eternals',
        'Casablanca', 'Lo Que el Viento se Llevó', 'Ciudadano Kane', 'El Mago de Oz',
        'West Side Story', 'Cantando Bajo la Lluvia', 'La Ventana Indiscreta', 'Psicosis',
        'Los Pájaros', 'Vértigo', 'Con la Muerte en los Talones', 'Rebecca',
        'E.T.', 'Tiburón', 'La Lista de Schindler', 'Parque Jurásico',
        'En Busca del Arca Perdida', 'Indiana Jones', 'Encuentros Cercanos', 'Minority Report',
        'Cazadores del Arca Perdida', 'El Imperio del Sol', 'Salvar al Soldado Ryan', 'Múnich'
      ]
    },
    comidas: {
      name: 'Comidas',
      icon: '🍕',
      color: 'from-orange-500 to-amber-600',
      words: [
        'Pizza', 'Hamburguesa', 'Pasta', 'Sushi',
        'Tacos', 'Paella', 'Lasaña', 'Risotto',
        'Curry', 'Pad Thai', 'Pho', 'Ramen',
        'Dim Sum', 'Peking Duck', 'Biryani', 'Falafel',
        'Shawarma', 'Kebab', 'Gyros', 'Moussaka',
        'Croissant', 'Baguette', 'Bagel', 'Pretzel',
        'Donut', 'Churros', 'Crepes', 'Waffles',
        'Pancakes', 'French Toast', 'Eggs Benedict', 'Omelette',
        'Cereal', 'Granola', 'Yogurt', 'Smoothie',
        'Burrito', 'Quesadilla', 'Enchiladas', 'Nachos',
        'Guacamole', 'Salsa', 'Ceviche', 'Empanadas',
        'Arepas', 'Feijoada', 'Churrasco', 'Asado',
        'Barbacoa', 'Hot Dog', 'Sandwich', 'Wrap',
        'Pita', 'Hummus', 'Baba Ganoush', 'Tabbouleh',
        'Tzatziki', 'Dolma', 'Baklava', 'Tiramisu',
        'Cannoli', 'Gelato', 'Macarons', 'Eclairs',
        'Profiteroles', 'Tarta', 'Cheesecake', 'Brownies',
        'Cookies', 'Cupcakes', 'Muffins', 'Scones',
        'Pie', 'Strudel', 'Pavlova', 'Trifle',
        'Pudding', 'Flan', 'Crème Brûlée', 'Mousse',
        'Panna Cotta', 'Sorbet', 'Parfait', 'Sundae',
        'Milkshake', 'Frappuccino', 'Cappuccino', 'Espresso',
        'Latte', 'Mocha', 'Té', 'Boba Tea',
        'Limonada', 'Sangría', 'Margarita', 'Mojito',
        'Piña Colada', 'Daiquiri', 'Cosmopolitan', 'Martini'
      ]
    },
    historicos: {
      name: 'Históricos',
      icon: '📜',
      color: 'from-amber-600 to-yellow-700',
      words: [
        'Napoleón Bonaparte', 'Julio César', 'Cleopatra', 'Alejandro Magno',
        'Albert Einstein', 'Isaac Newton', 'Leonardo da Vinci', 'Galileo Galilei',
        'Cristóbal Colón', 'Marco Polo', 'Fernando de Magallanes', 'Vasco da Gama',
        'Abraham Lincoln', 'George Washington', 'Winston Churchill', 'Nelson Mandela',
        'Mahatma Gandhi', 'Martin Luther King Jr', 'Rosa Parks', 'Harriet Tubman',
        'Simón Bolívar', 'José de San Martín', 'Miguel Hidalgo', 'Benito Juárez',
        'Eva Perón', 'Che Guevara', 'Fidel Castro', 'Hugo Chávez',
        'William Shakespeare', 'Miguel de Cervantes', 'Homero', 'Dante Alighieri',
        'Confucio', 'Buda', 'Mahoma', 'Jesús de Nazaret',
        'Moisés', 'Abraham', 'Sócrates', 'Platón',
        'Aristóteles', 'Arquímedes', 'Pitágoras', 'Euclides',
        'Hipócrates', 'Hipócrates', 'Marie Curie', 'Nikola Tesla',
        'Thomas Edison', 'Alexander Graham Bell', 'Louis Pasteur', 'Charles Darwin',
        'Gregor Mendel', 'Sigmund Freud', 'Carl Jung', 'Friedrich Nietzsche',
        'Karl Marx', 'Adam Smith', 'John Locke', 'Jean-Jacques Rousseau',
        'Voltaire', 'René Descartes', 'Immanuel Kant', 'David Hume',
        'Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Antonio Vivaldi',
        'Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dalí',
        'Frida Kahlo', 'Diego Rivera', 'Michelangelo', 'Rafael Sanzio',
        'Rembrandt', 'Johannes Vermeer', 'Caravaggio', 'El Greco',
        'Juana de Arco', 'Isabel la Católica', 'María Antonieta', 'Catalina la Grande',
        'Elizabeth I', 'Victoria de Inglaterra', 'Ana Bolena', 'María Estuardo',
        'Marco Aurelio', 'Nerón', 'Calígula', 'Augusto',
        'Trajano', 'Adriano', 'Constantino', 'Carlomagno',
        'Genghis Khan', 'Kublai Khan', 'Atila', 'Saladino'
      ]
    }
  };

  const selectPackage = (packageKey) => {
    setSelectedPackage(packageKey);
  };

  const startGame = () => {
    if (!selectedPackage) return;
    
    // Seleccionar palabra aleatoria del paquete elegido
    const packageWords = wordPackages[selectedPackage].words;
    const randomWord = packageWords[Math.floor(Math.random() * packageWords.length)];
    setSelectedWord(randomWord);
    
    // Crear array de roles (false = jugador normal, true = impostor)
    const playerRoles = Array(numPlayers).fill(false);
    const impostorIndex = Math.floor(Math.random() * numPlayers);
    playerRoles[impostorIndex] = true;
    
    setRoles(playerRoles);
    setGameState('playing');
    setCurrentPlayer(0);
    setWordRevealed(false);
  };

  const showWord = () => {
    setWordRevealed(true);
  };

  const nextPlayer = () => {
    if (currentPlayer < numPlayers - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setWordRevealed(false);
    } else {
      if (partyMode) {
        setGameState('voting');
      } else {
        setGameState('reveal');
      }
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentPlayer(0);
    setWordRevealed(false);
    setRoles([]);
    setSelectedWord('');
    setSelectedPackage(null);
    setImpostorWon(null);
  };

  const impostorWins = () => {
    setImpostorWon(true);
    setGameState('prenda');
  };

  const impostorLoses = () => {
    setImpostorWon(false);
    setGameState('prenda');
  };

  const skipToReveal = () => {
    setGameState('reveal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Setup Screen */}
        {gameState === 'setup' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🎭 El Impostor</h1>
              <p className="text-gray-600">¿Quién está mintiendo?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-3">
                  <Users className="w-5 h-5 mr-2" />
                  Número de jugadores
                </label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={numPlayers}
                  onChange={(e) => setNumPlayers(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg text-center font-bold"
                />
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-pink-200">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <p className="font-bold text-gray-800">Modo Fiesta</p>
                      <p className="text-xs text-gray-600">¡Con prendas divertidas!</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPartyMode(!partyMode)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      partyMode 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                        : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform ${
                      partyMode ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                  </button>
                </label>
              </div>

              <div>
                <label className="text-gray-700 font-semibold mb-3 block">
                  Elige un paquete de palabras
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {Object.entries(wordPackages).map(([key, pkg]) => (
                    <button
                      key={key}
                      onClick={() => selectPackage(key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPackage === key
                          ? `border-purple-500 bg-gradient-to-br ${pkg.color} text-white shadow-lg scale-105`
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{pkg.icon}</div>
                      <div className="font-semibold text-sm">{pkg.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={!selectedPackage}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                  selectedPackage
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Shuffle className="w-5 h-5" />
                Comenzar Partida
              </button>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-700">
                <strong>Cómo jugar:</strong> Todos recibirán la misma palabra excepto el impostor. 
                Los jugadores deben conversar y descubrir quién es el impostor sin revelar la palabra.
              </p>
            </div>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-6">
              <div className="inline-block bg-purple-100 px-6 py-2 rounded-full mb-4">
                <p className="text-sm font-semibold text-purple-600">
                  Jugador {currentPlayer + 1} de {numPlayers}
                </p>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Turno del Jugador {currentPlayer + 1}
              </h2>
            </div>

            {!wordRevealed ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
                  <p className="text-gray-700 mb-4">
                    Asegúrate de que nadie más esté mirando la pantalla
                  </p>
                </div>

                <button
                  onClick={showWord}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Ver mi palabra
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`rounded-2xl p-8 text-center transform transition-all ${
                  roles[currentPlayer] 
                    ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }`}>
                  {roles[currentPlayer] ? (
                    <>
                      <div className="text-6xl mb-4">🎭</div>
                      <p className="text-white text-3xl font-bold mb-2">
                        ERES EL IMPOSTOR
                      </p>
                      <p className="text-white text-lg opacity-90">
                        Intenta pasar desapercibido
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">✨</div>
                      <p className="text-white text-xl mb-2">Tu palabra es:</p>
                      <p className="text-white text-4xl font-bold">
                        {selectedWord}
                      </p>
                    </>
                  )}
                </div>

                <button
                  onClick={nextPlayer}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <EyeOff className="w-5 h-5" />
                  {currentPlayer < numPlayers - 1 ? 'Siguiente Jugador' : 'Terminar Ronda'}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Memoriza tu rol y pasa el teléfono
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reveal Screen */}
        {gameState === 'reveal' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Comienza el debate!
              </h2>
              <p className="text-gray-600 mb-6">
                Ahora todos deben conversar y votar quién creen que es el impostor
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <p className="text-center text-gray-700 mb-2">La palabra era:</p>
              <p className="text-center text-3xl font-bold text-purple-600">
                {selectedWord}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {roles.map((isImpostor, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    isImpostor 
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <p className="font-semibold">
                    Jugador {index + 1}: {isImpostor ? '🎭 IMPOSTOR' : `✨ ${selectedWord}`}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Nueva Partida
            </button>
          </div>
        )}

        {/* Voting Screen (Party Mode) */}
        {gameState === 'voting' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🗳️</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Momento de votar!
              </h2>
              <p className="text-gray-600 mb-2">
                Debatan entre todos y decidan:
              </p>
              <p className="text-lg font-semibold text-purple-600">
                ¿Quién es el impostor?
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
              <p className="text-center text-gray-700 text-sm mb-2">
                💡 <strong>Tip:</strong> El impostor debe convencer al grupo
              </p>
              <p className="text-center text-gray-700 text-sm">
                Los demás deben descubrirlo sin decir la palabra
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={impostorLoses}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                ✅ Descubrieron al impostor
              </button>

              <button
                onClick={impostorWins}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                🎭 El impostor ganó
              </button>

              <button
                onClick={skipToReveal}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-300 transition-all"
              >
                Ver quién era el impostor
              </button>
            </div>
          </div>
        )}

        {/* Prenda Screen (Party Mode) */}
        {gameState === 'prenda' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {impostorWon ? '🎭' : '✨'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {impostorWon ? '¡El impostor ganó!' : '¡Descubrieron al impostor!'}
              </h2>
            </div>

            <div className={`rounded-2xl p-6 mb-6 ${
              impostorWon 
                ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            }`}>
              <p className="text-white text-center text-xl font-bold mb-4">
                {impostorWon 
                  ? 'Los jugadores normales deben cumplir la prenda' 
                  : 'El impostor debe cumplir la prenda'}
              </p>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="text-white text-center text-2xl font-bold">
                  {prendas[Math.floor(Math.random() * prendas.length)]}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-center text-gray-700 text-sm mb-2">
                <strong>La palabra era:</strong>
              </p>
              <p className="text-center text-2xl font-bold text-purple-600">
                {selectedWord}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={skipToReveal}
                className="w-full bg-purple-100 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-200 transition-all"
              >
                Ver todos los roles
              </button>

              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Nueva Partida
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpostorGame;
