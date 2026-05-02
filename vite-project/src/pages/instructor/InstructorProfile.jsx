import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Car, LogOut, Edit, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const InstructorProfile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    specialty: currentUser?.specialty || '',
    experience: currentUser?.experience || '',
  });

  const handleSave = () => {
    updateUser(formData);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-neon-purple/30">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mb-4">
            <User size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{currentUser?.name}</h2>
          <p className="text-gray-400">{currentUser?.role}</p>
          <p className="text-sm text-neon-purple mt-2">{currentUser?.specialty}</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Personal Details</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => editing ? handleSave() : setEditing(true)}
            icon={editing ? Save : Edit}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            label="Name"
            icon={User}
            value={editing ? formData.name : currentUser?.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!editing}
          />

          <Input
            label="Email"
            icon={Mail}
            value={editing ? formData.email : currentUser?.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!editing}
          />

          <Input
            label="Phone"
            icon={Phone}
            value={editing ? formData.phone : currentUser?.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!editing}
          />

          {editing && (
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" onClick={() => setEditing(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Professional Info</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <Car className="text-gray-400" size={20} />
              <span className="text-gray-300">Specialty</span>
            </div>
            <span className="text-white">{currentUser?.specialty || 'Not set'}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <Car className="text-gray-400" size={20} />
              <span className="text-gray-300">Experience</span>
            </div>
            <span className="text-white">{currentUser?.experience || 'Not set'}</span>
          </div>
        </div>
      </Card>

      <Button 
        variant="danger" 
        onClick={handleLogout}
        fullWidth
        icon={LogOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default InstructorProfile;