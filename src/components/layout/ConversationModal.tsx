import { HiOutlineChatAlt2 } from 'react-icons/hi';

const conversations = [
  { id: 1, name: 'Lucía', lastMessage: '¡Hola! ¿Cómo estás?', avatar: 'https://i.pravatar.cc/44' },
  { id: 2, name: 'Pedro', lastMessage: '¿Nos vemos mañana?', avatar: 'https://i.pravatar.cc/45' },
  { id: 3, name: 'Sofía', lastMessage: '¡Gracias por la info!', avatar: 'https://i.pravatar.cc/46' },
];

interface ConversationModalProps {
  open: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      {/* Modal */}
      <aside className="relative w-80 h-full bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg flex items-center gap-2 text-blue-600">
            <HiOutlineChatAlt2 /> Conversaciones
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer mb-2">
              <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold text-gray-800">{c.name}</div>
                <div className="text-xs text-gray-500">{c.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ConversationModal;
