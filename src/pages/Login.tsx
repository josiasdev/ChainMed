import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  connectWallet, 
  checkUserType, 
  registerDoctor, 
  registerPatient,
  getDoctorDetails,
  getPatientDetails
} from '@/utils/web3';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userType, setUserType] = useState<'doctor' | 'patient' | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Registration form data
  const [formData, setFormData] = useState({
    name: '',
    document: '', // CPF for patients, CRM for doctors
    specialty: '', // Only for doctors
  });

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const account = await connectWallet();
      if (account) {
        setWalletAddress(account.address);
        
        // Check if user exists on the blockchain
        const type = await checkUserType(account.address);
        setUserType(type);
        
        if (type) {
          // User exists, save their info and redirect
          let userData = {
            address: account.address,
            userType: type
          };
          
          // Obter detalhes adicionais do usuário do contrato
          if (type === 'doctor') {
            const doctorDetails = await getDoctorDetails(account.address);
            if (doctorDetails) {
              userData = {
                ...userData,
                name: doctorDetails.name,
                document: doctorDetails.crm,
                specialty: doctorDetails.specialty
              };
            }
          } else {
            const patientDetails = await getPatientDetails(account.address);
            if (patientDetails) {
              userData = {
                ...userData,
                name: patientDetails.name,
                document: patientDetails.cpf
              };
            }
          }
          
          localStorage.setItem('turingrx-user', JSON.stringify(userData));
          
          toast.success('Login bem-sucedido!');
          
          // Redirect to appropriate dashboard
          if (type === 'doctor') {
            navigate('/doctor/prescriptions');
          } else {
            navigate('/patient/prescriptions');
          }
        } else {
          // User needs to register
          setIsRegistering(true);
        }
      }
    } catch (error) {
      console.error('Error connecting wallet', error);
      toast.error('Erro ao conectar carteira');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress || !userType) return;
    
    setIsProcessing(true);
    try {
      toast.loading('Registrando na blockchain...');
      
      let success = false;
      
      // Registrar na blockchain usando o contrato real
      if (userType === 'doctor') {
        success = await registerDoctor(
          formData.name,
          formData.document, // CRM
          formData.specialty
        );
      } else {
        success = await registerPatient(
          formData.name,
          formData.document // CPF
        );
      }
      
      if (success) {
        // Save user info to localStorage
        localStorage.setItem('turingrx-user', JSON.stringify({
          address: walletAddress,
          userType,
          name: formData.name,
          document: formData.document,
          ...(userType === 'doctor' ? { specialty: formData.specialty } : {})
        }));
        
        toast.dismiss();
        toast.success('Registro concluído com sucesso!');
        
        // Redirect to dashboard
        if (userType === 'doctor') {
          navigate('/doctor/prescriptions');
        } else {
          navigate('/patient/prescriptions');
        }
      } else {
        toast.dismiss();
        toast.error('Falha no registro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao registrar. Por favor tente novamente.');
      console.error('Registration error', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('turingrx-user');
    if (storedUser) {
      const { userType } = JSON.parse(storedUser);
      if (userType === 'doctor') {
        navigate('/doctor/prescriptions');
      } else {
        navigate('/patient/prescriptions');
      }
    }
  }, [navigate]);

  return (
    <Layout showNav={false}>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-secondary/50">
        <div className="w-full max-w-md px-4">
          {!walletAddress ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Bem-vindo ao ChainMed</CardTitle>
                <CardDescription>
                  Conecte sua carteira MetaMask para acessar a plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button 
                  size="lg"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="bg-medical-500 hover:bg-medical-600"
                >
                  {isConnecting ? 'Conectando...' : 'Conectar MetaMask'}
                </Button>
              </CardContent>
              <CardFooter className="text-center text-sm text-gray-500">
                <p>
                  Você precisará de uma conta MetaMask com ETH na rede Sepolia para utilizar esta aplicação.
                </p>
              </CardFooter>
            </Card>
          ) : isRegistering ? (
            <Card>
              <CardHeader>
                <CardTitle>Complete seu registro</CardTitle>
                <CardDescription>
                  Escolha seu tipo de perfil e preencha suas informações
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label>Endereço da carteira</Label>
                    <Input value={walletAddress} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tipo de usuário</Label>
                    <RadioGroup 
                      defaultValue={userType || undefined} 
                      className="flex gap-4"
                      onValueChange={(value) => setUserType(value as 'doctor' | 'patient')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="doctor" />
                        <Label htmlFor="doctor">Médico</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="patient" id="patient" />
                        <Label htmlFor="patient">Paciente</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="document">
                      {userType === 'doctor' ? 'CRM' : 'CPF'}
                    </Label>
                    <Input 
                      id="document"
                      value={formData.document}
                      onChange={(e) => setFormData({...formData, document: e.target.value})}
                      required
                    />
                  </div>
                  
                  {userType === 'doctor' && (
                    <div className="space-y-1">
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Input 
                        id="specialty"
                        value={formData.specialty}
                        onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                        required
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="bg-medical-500 hover:bg-medical-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Registrar'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Verificando seus dados...</CardTitle>
                <CardDescription>
                  Por favor, aguarde enquanto verificamos seu cadastro na blockchain.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
