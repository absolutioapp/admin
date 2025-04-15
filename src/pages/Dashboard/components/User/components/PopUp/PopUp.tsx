import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "../../User.types"; // если вынес тип User отдельно

interface PopUpProps {
  user: User;
  onClose: () => void;
}

export default function PopUp({ user, onClose }: PopUpProps) {
  const [formData, setFormData] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Сохранённые данные:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="mb-4 text-lg font-bold">
            Редактирование пользователя
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Имя"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border p-2"
              placeholder="Почта"
            />
            <input
              type="date"
              name="registeredAt"
              value={formData.registeredAt}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
            <select
              name="subscriptionStatus"
              value={formData.subscriptionStatus}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option value="active">Активна</option>
              <option value="inactive">Неактивна</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Сохранить
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
