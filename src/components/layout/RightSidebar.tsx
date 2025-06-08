import { HiOutlineUsers, HiOutlineHashtag, HiOutlineCalendar } from 'react-icons/hi';

const onlineUsers = [
	{ name: 'Lucía', avatar: 'https://i.pravatar.cc/44' },
	{ name: 'Pedro', avatar: 'https://i.pravatar.cc/45' },
	{ name: 'Sofía', avatar: 'https://i.pravatar.cc/46' },
];

const events = [
	{ title: 'Taller de escritura', date: '10 Jun, 18:00' },
	{ title: 'Fiesta de bienvenida', date: '12 Jun, 21:00' },
];

const trends = ['#cultura', '#eventos', '#comunidad', '#tendencias'];

const RightSidebar: React.FC = () => {
	return (
		<div className="flex flex-col h-full p-4 gap-6 bg-white">
			{/* Usuarios en línea */}
			<div className="rounded-lg shadow-md p-4 bg-white">
				<div className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
					<HiOutlineUsers /> Usuarios en línea
				</div>
				<div className="flex -space-x-2 mb-1">
					{onlineUsers.map((u, i) => (
						<img
							key={i}
							src={u.avatar}
							alt={u.name}
							className="w-8 h-8 rounded-full border-2 border-white"
						/>
					))}
				</div>
				<div className="text-xs text-gray-500">
					{onlineUsers.length} conectados
				</div>
			</div>
			{/* Eventos próximos */}
			<div className="rounded-lg shadow-md p-4 bg-white">
				<div className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
					<HiOutlineCalendar /> Eventos próximos
				</div>
				<ul className="text-sm text-gray-600 space-y-1">
					{events.map((e, i) => (
						<li key={i} className="flex justify-between">
							<span>{e.title}</span>
							<span className="text-xs text-gray-400">{e.date}</span>
						</li>
					))}
				</ul>
			</div>
			{/* Tendencias */}
			<div className="rounded-lg shadow-md p-4 bg-white">
				<div className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
					<HiOutlineHashtag /> Tendencias
				</div>
				<div className="flex flex-wrap gap-2">
					{trends.map((t, i) => (
						<span
							key={i}
							className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
						>
							{t}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default RightSidebar;
