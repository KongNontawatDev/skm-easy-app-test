import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard
} from '@/components/mobile'
import { 
  DollarSign,
  FileText,
  Car,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { mockHomeData } from '../home/data/mock-data'

export function ContractDetail() {
  const { contractId } = useParams({ from: '/contract/$contractId' })

  // หาข้อมูลสัญญาจาก mockHomeData
  const contractFromCarousel = mockHomeData.contracts.find(
    contract => contract.contractNumber === contractId
  )

  // Mock data - ในแอปจริงจะ fetch จาก API
  const mockContracts = {
    'CT-2024-001': {
      id: 'CT-2024-001',
      contractNumber: 'CT-2024-001',
      vehicleInfo: {
        brand: 'Honda',
        model: 'CBR150R',
        year: 2023,
        color: 'แดง',
        plateNumber: 'กข-1234',
        imageUrl: 'https://s38.wheelsage.org/picture/h/honda/cbr1000rr_sp/honda_cbr1000rr_sp_8.jpeg'
      },
      customerInfo: {
        name: 'สมชาย ใจดี',
        phone: '081-234-5678',
        email: 'somchai@email.com',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110'
      },
      financialInfo: {
        totalAmount: 350000,
        downPayment: 50000,
        loanAmount: 300000,
        monthlyPayment: 15000,
        interestRate: 2.5,
        remainingAmount: 180000
      },
      contractInfo: {
        startDate: '2023-06-01',
        endDate: '2025-05-31',
        term: 24,
        status: 'active'
      },
      createdAt: '2023-06-01T00:00:00Z'
    },
    'CT-2024-002': {
      id: 'CT-2024-002',
      contractNumber: 'CT-2024-002',
      vehicleInfo: {
        brand: 'Honda',
        model: 'PCX160',
        year: 2022,
        color: 'ดำ',
        plateNumber: 'กข-5678',
        imageUrl: 'https://img.motofiixthailand.com/asset/files/17345971816726901.webp'
      },
      customerInfo: {
        name: 'สมศรี รักดี',
        phone: '082-345-6789',
        email: 'somsri@email.com',
        address: '456 ถนนรัชดาภิเษก กรุงเทพฯ 10400'
      },
      financialInfo: {
        totalAmount: 280000,
        downPayment: 40000,
        loanAmount: 240000,
        monthlyPayment: 12000,
        interestRate: 2.8,
        remainingAmount: 120000
      },
      contractInfo: {
        startDate: '2022-08-01',
        endDate: '2024-07-31',
        term: 20,
        status: 'active'
      },
      createdAt: '2022-08-01T00:00:00Z'
    },
    'CT-2024-003': {
      id: 'CT-2024-003',
      contractNumber: 'CT-2024-003',
      vehicleInfo: {
        brand: 'Honda',
        model: 'Wave 125i',
        year: 2021,
        color: 'เงิน',
        plateNumber: 'กข-9012',
        imageUrl: 'https://s359.kapook.com/rq/600/auto/10/pagebuilder/d00209a5-b85a-4592-8cd5-3955b2d799c2.jpg'
      },
      customerInfo: {
        name: 'สมศักดิ์ ใจงาม',
        phone: '083-456-7890',
        email: 'somsak@email.com',
        address: '789 ถนนลาดพร้าว กรุงเทพฯ 10230'
      },
      financialInfo: {
        totalAmount: 150000,
        downPayment: 25000,
        loanAmount: 125000,
        monthlyPayment: 6250,
        interestRate: 3.0,
        remainingAmount: 45000
      },
      contractInfo: {
        startDate: '2021-12-01',
        endDate: '2023-11-30',
        term: 20,
        status: 'overdue'
      },
      createdAt: '2021-12-01T00:00:00Z'
    }
  }

  // ใช้ข้อมูลจาก carousel หรือ fallback ไปที่ mock data
  const contract = contractFromCarousel ? {
    id: contractFromCarousel.id,
    contractNumber: contractFromCarousel.contractNumber,
    vehicleInfo: {
      brand: contractFromCarousel.vehicleInfo.brand,
      model: contractFromCarousel.vehicleInfo.model,
      year: contractFromCarousel.vehicleInfo.year,
      color: contractFromCarousel.vehicleInfo.color,
      plateNumber: 'กข-1234',
      imageUrl: contractFromCarousel.vehicleInfo.imageUrl
    },
    customerInfo: {
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@email.com',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110'
    },
    financialInfo: {
      totalAmount: contractFromCarousel.remainingAmount + 170000, // คำนวณจากข้อมูลที่มี
      downPayment: 50000,
      loanAmount: contractFromCarousel.remainingAmount + 120000,
      monthlyPayment: contractFromCarousel.remainingAmount / 12, // ประมาณการ
      interestRate: 2.5,
      remainingAmount: contractFromCarousel.remainingAmount
    },
    contractInfo: {
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      term: 24,
      status: contractFromCarousel.status
    },
    createdAt: '2023-06-01T00:00:00Z'
  } : mockContracts[contractId as keyof typeof mockContracts] || {
    id: contractId,
    contractNumber: contractId,
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      year: 2023,
      color: 'แดง',
      plateNumber: 'กข-0000',
      imageUrl: 'https://s359.kapook.com/rq/600/auto/10/pagebuilder/d00209a5-b85a-4592-8cd5-3955b2d799c2.jpg'
    },
    customerInfo: {
      name: 'ลูกค้าทั่วไป',
      phone: '080-000-0000',
      email: 'customer@email.com',
      address: 'ที่อยู่ลูกค้า'
    },
    financialInfo: {
      totalAmount: 200000,
      downPayment: 30000,
      loanAmount: 170000,
      monthlyPayment: 8500,
      interestRate: 2.5,
      remainingAmount: 100000
    },
    contractInfo: {
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      term: 20,
      status: 'active'
    },
    createdAt: '2024-01-01T00:00:00Z'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('th-TH')
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="รายละเอียดสัญญา" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Contract Header */}
          <MobileCard className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {contract.vehicleInfo.brand} {contract.vehicleInfo.model}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                สัญญาเลขที่: {contract.contractNumber}
              </p>
              <div className="mt-4 inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                สถานะ: ใช้งานอยู่
              </div>
            </div>
          </MobileCard>

          {/* Vehicle Info */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลรถ
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ยี่ห้อ/รุ่น</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.vehicleInfo.brand} {contract.vehicleInfo.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ปี</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.vehicleInfo.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">สี</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.vehicleInfo.color}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ทะเบียน</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.vehicleInfo.plateNumber}
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Financial Info */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลการเงิน
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ราคารถ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(contract.financialInfo.totalAmount)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">เงินดาวน์</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(contract.financialInfo.downPayment)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ยอดกู้</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(contract.financialInfo.loanAmount)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ค่างวดรายเดือน</span>
                <span className="font-bold text-[#EC1B2E] text-lg">
                  {formatNumber(contract.financialInfo.monthlyPayment)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">อัตราดอกเบี้ย</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.financialInfo.interestRate}% ต่อปี
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ยอดคงเหลือ</span>
                <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                  {formatNumber(contract.financialInfo.remainingAmount)} ฿
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Contract Terms */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              เงื่อนไขสัญญา
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วันที่เริ่มสัญญา</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(contract.contractInfo.startDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วันที่สิ้นสุดสัญญา</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(contract.contractInfo.endDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ระยะเวลาสัญญา</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {contract.contractInfo.term} เดือน
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Customer Info */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลลูกค้า
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-900 dark:text-gray-100">{contract.customerInfo.name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-900 dark:text-gray-100">{contract.customerInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-900 dark:text-gray-100">{contract.customerInfo.email}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                <span className="text-gray-900 dark:text-gray-100">{contract.customerInfo.address}</span>
              </div>
            </div>
          </MobileCard>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/contract" />
    </MobileLayout>
  )
}