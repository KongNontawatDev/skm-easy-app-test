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

export function ContractDetail() {
  const { id } = useParams({ from: '/contract/$id' })

  // Mock data - ในแอปจริงจะ fetch จาก API
  const contract = {
    id: id,
    contractNumber: 'CT-2024-001',
    vehicleInfo: {
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      color: 'ขาว',
      plateNumber: 'กข-1234',
      imageUrl: '/placeholder-car.jpg'
    },
    customerInfo: {
      name: 'จอห์น โด',
      phone: '081-234-5678',
      email: 'john.doe@example.com',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110'
    },
    financialInfo: {
      totalAmount: 1200000,
      downPayment: 200000,
      loanAmount: 1000000,
      monthlyPayment: 15000,
      interestRate: 3.5,
      remainingAmount: 360000
    },
    contractInfo: {
      startDate: '2024-01-01',
      endDate: '2026-12-31',
      term: 36,
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
        onBackClick={() => window.location.href = '/contract'}
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