
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, User, Mail, Phone, Building } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    businessType: '',
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Create mailto link with form data
//     const subject = encodeURIComponent('Demo Request - BillQ Smart Order Management');
//     const body = encodeURIComponent(`
// Demo Request Details:

// Name: ${formData.fullName}
// Email: ${formData.email}
// Mobile: ${formData.mobile}
// Business Type: ${formData.businessType}
// Requirements: ${formData.requirements}

// Please contact me for a demo of BillQ Smart Order Management System.
//     `);
    
//     const mailtoLink = `mailto:support@billq.co.in?subject=${subject}&body=${body}`;
//     window.open(mailtoLink);
    
//     setIsSubmitted(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsSubmitted(false);
//       onClose();
//       setFormData({
//         fullName: '',
//         email: '',
//         mobile: '',
//         businessType: '',
//         requirements: ''
//       });
//     }, 2000);
//   };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const message = `
*Demo Request - BillQ Smart Order Management*

*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Mobile:* ${formData.mobile}
*Business Type:* ${formData.businessType}
*Requirements:* ${formData.requirements || 'N/A'}

Please contact me for a demo.
  `;

  // ✅ Replace with your WhatsApp number (international format, no + sign)
  const whatsappNumber = '918220760340';

  // Open WhatsApp with pre-filled message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');

  setIsSubmitted(true);
  setTimeout(() => {
    setIsLoading(false);
    setIsSubmitted(false);
    onClose();
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      businessType: '',
      requirements: ''
    });
  }, 2000);
};

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#0bc073]">
            Get Free Demo & Consultation
          </DialogTitle>
          <p className="text-center text-gray-600">
            Fill this form and our team will contact you within 2 hours
          </p>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-[#0bc073] mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Thank You!</h4>
            <p className="text-gray-600 mb-4">Your demo request has been sent successfully.</p>
            <p className="text-sm text-gray-500">Our team will contact you within 2 hours</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Select onValueChange={(value) => handleInputChange('businessType', value)} required>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Shop/Store</SelectItem>
                    <SelectItem value="distributor">Distributor/Wholesaler</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                    <SelectItem value="restaurant">Restaurant/Cafe</SelectItem>
                    <SelectItem value="medical">Medical/Clinic</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="other">Other Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Tell us about your specific workflow needs or any customization requirements"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#0bc073] hover:bg-[#089a5f]" 
              disabled={isLoading || !formData.fullName || !formData.email || !formData.mobile || !formData.businessType}
            >
              {isLoading ? 'Sending Request...' : 'Get Free Demo'}
            </Button>
            
            <div className="text-xs text-gray-500 text-center">
              By submitting, you agree to receive business communication from BillQ team
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
