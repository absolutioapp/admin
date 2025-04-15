import { useState, useMemo } from "react";
import PopUp from "../PopUp/PopUp";
import { User } from "../../User.types";

type SortColumn = "name" | "email" | "registeredAt" | "subscriptionStatus";

export default function Table({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortColumn>("registeredAt");
  const [filterActive, setFilterActive] = useState<
    "all" | "active" | "inactive"
  >("all");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // If same column, toggle direction
      setSortAsc(!sortAsc);
    } else {
      // If new column, set it and default to ascending
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterActive !== "all") {
      result = result.filter((u) => u.subscriptionStatus === filterActive);
    }

    result.sort((a, b) => {
      // Custom sort based on the selected column
      switch (sortColumn) {
        case "name":
          return sortAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "email":
          return sortAsc
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        case "registeredAt":
          const aDate = new Date(a.registeredAt).getTime();
          const bDate = new Date(b.registeredAt).getTime();
          return sortAsc ? aDate - bDate : bDate - aDate;
        case "subscriptionStatus":
          return sortAsc
            ? a.subscriptionStatus.localeCompare(b.subscriptionStatus)
            : b.subscriptionStatus.localeCompare(a.subscriptionStatus);
        default:
          return 0;
      }
    });

    return result;
  }, [users, searchTerm, sortColumn, sortAsc, filterActive]);

  // Helper to render sort indicator
  const getSortIndicator = (column: SortColumn) => {
    if (sortColumn === column) {
      return sortAsc ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* Controls */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:outline-accent-100 block w-[30%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        />

        <div className="flex gap-2">
          <select
            value={filterActive}
            onChange={(e) =>
              setFilterActive(e.target.value as "all" | "active" | "inactive")
            }
            className="rounded border px-4 py-2"
          >
            <option value="all">All</option>
            <option value="active">Active only</option>
            <option value="inactive">Inactive only</option>
          </select>
        </div>
      </div>

      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort("name")}
            >
              Name{getSortIndicator("name")}
            </th>
            <th
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort("email")}
            >
              Email{getSortIndicator("email")}
            </th>
            <th
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort("registeredAt")}
            >
              Registration Date{getSortIndicator("registeredAt")}
            </th>
            <th
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSort("subscriptionStatus")}
            >
              Subscription{getSortIndicator("subscriptionStatus")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer border-b border-b-gray-400 hover:bg-gray-50"
              onClick={() => setSelectedUser(user)}
            >
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.registeredAt}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                    user.subscriptionStatus === "active"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {user.subscriptionStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <PopUp user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
