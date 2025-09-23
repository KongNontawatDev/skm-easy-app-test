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
  User
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { getContractById } from '@/lib/mock-data'

export function ContractDetail() {
  const { contractId } = useParams({ from: '/contract/$contractId' })

  // ใช้ข้อมูลจากข้อมูลกลาง
  const contract = getContractById(contractId)

  if (!contract) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบข้อมูลสัญญา" />
        <MobileContent>
          <MobileCard>
            <p className="text-center text-gray-500">ไม่พบข้อมูลสัญญาที่ระบุ</p>
          </MobileCard>
        </MobileContent>
      </MobileLayout>
    )
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'ใช้งานอยู่'
      case 'overdue':
        return 'ค้างชำระ'
      case 'completed':
        return 'เสร็จสิ้น'
      default:
        return status
    }
  }

  return (
    <MobileLayout>
      <MobileHeader title={`สัญญา ${contract.contractNumber}`} />
      <MobileContent>
        {/* ข้อมูลรถ */}
        <MobileCard>
          <div className="flex items-center space-x-3 mb-4">
            <Car className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">ข้อมูลรถ</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">ยี่ห้อ/รุ่น:</span>
              <span className="font-medium">{contract.vehicleInfo.brand} {contract.vehicleInfo.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ปี:</span>
              <span className="font-medium">{contract.vehicleInfo.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">สี:</span>
              <span className="font-medium">{contract.vehicleInfo.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ทะเบียน:</span>
              <span className="font-medium">{contract.vehicleInfo.plateNumber}</span>
            </div>
          </div>
        </MobileCard>

        {/* ข้อมูลลูกค้า */}
        <MobileCard>
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">ข้อมูลลูกค้า</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">ชื่อ-นามสกุล:</span>
              <span className="font-medium">{contract.customerInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">โทรศัพท์:</span>
              <span className="font-medium">{contract.customerInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">อีเมล:</span>
              <span className="font-medium">{contract.customerInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ที่อยู่:</span>
              <span className="font-medium text-right">{contract.customerInfo.address}</span>
            </div>
          </div>
        </MobileCard>

        {/* ข้อมูลทางการเงิน */}
        <MobileCard>
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold">ข้อมูลทางการเงิน</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">ยอดเงินรวม:</span>
              <span className="font-medium">{formatNumber(contract.financialInfo.totalAmount)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">เงินดาวน์:</span>
              <span className="font-medium">{formatNumber(contract.financialInfo.downPayment)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">เงินกู้:</span>
              <span className="font-medium">{formatNumber(contract.financialInfo.loanAmount)} บาท</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">งวดผ่อน:</span>
              <span className="font-medium">{formatNumber(contract.financialInfo.monthlyPayment)} บาท/เดือน</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ดอกเบี้ย:</span>
              <span className="font-medium">{contract.financialInfo.interestRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ยอดคงเหลือ:</span>
              <span className="font-medium text-red-600">{formatNumber(contract.financialInfo.remainingAmount)} บาท</span>
            </div>
          </div>
        </MobileCard>

        {/* ข้อมูลสัญญา */}
        <MobileCard>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">ข้อมูลสัญญา</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">เลขที่สัญญา:</span>
              <span className="font-medium">{contract.contractNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">วันที่เริ่มสัญญา:</span>
              <span className="font-medium">{formatDate(contract.contractInfo.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">วันที่สิ้นสุดสัญญา:</span>
              <span className="font-medium">{formatDate(contract.contractInfo.endDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ระยะเวลา:</span>
              <span className="font-medium">{contract.financialInfo.term} เดือน</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">สถานะ:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.contractInfo.status)}`}>
                {getStatusText(contract.contractInfo.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">งวดถัดไป:</span>
              <span className="font-medium">{formatDate(contract.nextPaymentDate)}</span>
            </div>
          </div>
        </MobileCard>

        {/* ปุ่มดาวน์โหลดสัญญา */}
        <MobileCard>
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            ดาวน์โหลดสัญญา
          </button>
        </MobileCard>
      </MobileContent>
      <BottomNavigation currentPath="/contract" />
    </MobileLayout>
  )
}