import React, { useState, useEffect } from 'react';
import { Car, Search, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getVehicles, setVehicles } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

const AdminVehicles = () => {
  const { getAllVehicles } = useAuth();
  const [vehicles, setVehiclesData] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({ 
    make: '', model: '', year: '', plateNumber: '', type: 'Automatic', status: 'Available' 
  });

  useEffect(() => {
    const allVehicles = getAllVehicles();
    setVehiclesData(allVehicles);
  }, []);

  const filteredVehicles = vehicles.filter(v => 
    v.make.toLowerCase().includes(search.toLowerCase()) || 
    v.model.toLowerCase().includes(search.toLowerCase()) ||
    v.plateNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (vehicleId) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
      setVehicles(updatedVehicles);
      setVehiclesData(updatedVehicles);
    }
  };

  const handleSave = () => {
    if (editingVehicle) {
      const updatedVehicles = vehicles.map(v => v.id === editingVehicle.id ? { ...v, ...formData } : v);
      setVehicles(updatedVehicles);
      setVehiclesData(updatedVehicles);
    } else {
      const newVehicle = {
        ...formData,
        id: `vehicle_${Date.now()}`,
        image: 'https://images.unsplash.com/photo-1621007047382-8b3f0e1b3e4a?w=400',
      };
      const updatedVehicles = [...vehicles, newVehicle];
      setVehicles(updatedVehicles);
      setVehiclesData(updatedVehicles);
    }
    setShowModal(false);
    setEditingVehicle(null);
    setFormData({ make: '', model: '', year: '', plateNumber: '', type: 'Automatic', status: 'Available' });
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({ make: vehicle.make, model: vehicle.model, year: vehicle.year, plateNumber: vehicle.plateNumber, type: vehicle.type, status: vehicle.status });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingVehicle(null);
    setFormData({ make: '', model: '', year: '', plateNumber: '', type: 'Automatic', status: 'Available' });
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search vehicles..."
          icon={Search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={openAddModal} icon={Plus} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{vehicles.length}</p>
            <p className="text-sm text-gray-400">Total Vehicles</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-neon-green">
              {vehicles.filter(v => v.status === 'Available').length}
            </p>
            <p className="text-sm text-gray-400">Available</p>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {filteredVehicles.map(vehicle => (
          <Card key={vehicle.id}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <Car className="text-neon-blue" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{vehicle.make} {vehicle.model}</h4>
                    <p className="text-sm text-gray-400">{vehicle.year} • {vehicle.plateNumber}</p>
                    <p className="text-sm text-gray-500">{vehicle.type}</p>
                  </div>
                  <span className={`
                    px-2 py-1 text-xs rounded-lg
                    ${vehicle.status === 'Available' ? 'bg-neon-green/20 text-neon-green' : 
                      vehicle.status === 'In Use' ? 'bg-neon-blue/20 text-neon-blue' : 
                      'bg-red-500/20 text-red-400'}
                  `}>
                    {vehicle.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(vehicle)} icon={Edit}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(vehicle.id)} icon={Trash2}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'} size="md">
        <div className="space-y-4">
          <Input
            label="Make"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            placeholder="e.g., Toyota"
            required
          />
          <Input
            label="Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            placeholder="e.g., Corolla"
            required
          />
          <Input
            label="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="e.g., 2023"
            required
          />
          <Input
            label="Plate Number"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
            placeholder="e.g., ABC 123"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Automatic', 'Manual'].map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`
                    py-2 rounded-xl text-sm transition-all
                    ${formData.type === type 
                      ? 'bg-neon-blue text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {['Available', 'In Use', 'Maintenance'].map(status => (
                <button
                  key={status}
                  onClick={() => setFormData({ ...formData, status })}
                  className={`
                    py-2 rounded-xl text-sm transition-all
                    ${formData.status === status 
                      ? 'bg-neon-blue text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} fullWidth>
            {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVehicles;