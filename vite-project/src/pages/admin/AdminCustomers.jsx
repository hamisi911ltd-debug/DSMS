import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Trash2, Edit, User, Phone, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUsers, setUsers, getBookings, setBookings } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

const AdminCustomers = () => {
  const { getAllUsers } = useAuth();
  const [users, setUsersData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'customer', specialty: '', experience: '' });

  useEffect(() => {
    const allUsers = getAllUsers();
    setUsersData(allUsers);
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      setUsersData(updatedUsers);
    }
  };

  const handleSave = () => {
    if (editingUser) {
      const updatedUsers = users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u);
      setUsers(updatedUsers);
      setUsersData(updatedUsers);
    } else {
      const newUser = {
        ...formData,
        id: `user_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setUsersData(updatedUsers);
    }
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', password: '', role: 'customer', specialty: '', experience: '' });
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, password: user.password || '', role: user.role, specialty: user.specialty || '', experience: user.experience || '' });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', password: '', role: 'customer', specialty: '', experience: '' });
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search users..."
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={openAddModal} icon={Plus} />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['all', 'customer', 'instructor'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all
              ${filter === f 
                ? 'bg-neon-blue text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'}
            `}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredUsers.map(user => (
          <Card key={user.id}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                  <span className={`
                    px-2 py-1 text-xs rounded-lg
                    ${user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 
                      user.role === 'instructor' ? 'bg-neon-purple/20 text-neon-purple' : 
                      'bg-neon-blue/20 text-neon-blue'}
                  `}>
                    {user.role}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(user)} icon={Edit}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)} icon={Trash2}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingUser ? 'Edit User' : 'Add User'} size="md">
        <div className="space-y-4">
          <Input
            label="Name"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            icon={Mail}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Password"
            icon={User}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!editingUser}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <div className="grid grid-cols-3 gap-2">
              {['customer', 'instructor', 'admin'].map(role => (
                <button
                  key={role}
                  onClick={() => setFormData({ ...formData, role })}
                  className={`
                    py-2 rounded-xl text-sm transition-all
                    ${formData.role === role 
                      ? 'bg-neon-blue text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                  `}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {formData.role === 'instructor' && (
            <>
              <Input
                label="Specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="e.g., Beginner, Advanced"
              />
              <Input
                label="Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 5 years"
              />
            </>
          )}
          <Button onClick={handleSave} fullWidth>
            {editingUser ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCustomers;