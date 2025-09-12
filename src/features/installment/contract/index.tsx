import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton
} from '@/components/mobile'
import { 
  Car, 
  Calendar, 
  DollarSign, 
  FileText,
  Phone
} from 'lucide-react'

export function Contract() {
  const contracts = [
    {
      id: '1',
      contractNo: 'CNT-2024-001',
      carModel: 'Toyota Camry 2.5 Hybrid',
      carYear: '2024',
      carColor: 'สีขาว',
      carPlate: 'กข-1234 กรุงเทพ',
      totalAmount: '฿1,200,000',
      downPayment: '฿200,000',
      loanAmount: '฿1,000,000',
      interestRate: '4.5%',
      installmentAmount: '฿15,000',
      installmentCount: '36 งวด',
      remainingAmount: '฿850,000',
      remainingInstallments: '24 งวด',
      startDate: '15 ม.ค. 2567',
      endDate: '15 ม.ค. 2570',
      nextPaymentDate: '15 ก.พ. 2567',
      status: 'active'
    }
  ]

  return (
    <MobileLayout>
      <MobileHeader 
        title="ข้อมูลสัญญา" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
        showMoreMenu={true}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="space-y-4">
              {/* Contract Header */}
              <MobileCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">{contract.contractNo}</h2>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {contract.status === 'active' ? 'ใช้งาน' : 'ปิดใช้งาน'}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-8 w-8 text-[#EC1B2E]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{contract.carModel}</h3>
                    <p className="text-gray-500 text-sm">{contract.carYear} • {contract.carColor}</p>
                    <p className="text-gray-500 text-sm">{contract.carPlate}</p>
                  </div>
                </div>
              </MobileCard>

              {/* Financial Summary */}
              <MobileCard className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">สรุปการเงิน</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">ยอดรวมสัญญา</p>
                    <p className="font-semibold text-gray-900">{contract.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">เงินดาวน์</p>
                    <p className="font-semibold text-gray-900">{contract.downPayment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ยอดกู้</p>
                    <p className="font-semibold text-gray-900">{contract.loanAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">อัตราดอกเบี้ย</p>
                    <p className="font-semibold text-gray-900">{contract.interestRate}</p>
                  </div>
                </div>
              </MobileCard>

              {/* Installment Details */}
              <MobileCard className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดงวด</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">งวดละ</p>
                    <p className="font-semibold text-gray-900">{contract.installmentAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">จำนวนงวด</p>
                    <p className="font-semibold text-gray-900">{contract.installmentCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ยอดคงเหลือ</p>
                    <p className="font-semibold text-gray-900">{contract.remainingAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">งวดคงเหลือ</p>
                    <p className="font-semibold text-gray-900">{contract.remainingInstallments}</p>
                  </div>
                </div>
              </MobileCard>

              {/* Payment Schedule */}
              <MobileCard className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">กำหนดการชำระ</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-[#EC1B2E]" />
                      <span className="text-gray-700">วันที่เริ่มสัญญา</span>
                    </div>
                    <span className="font-semibold text-gray-900">{contract.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-[#EC1B2E]" />
                      <span className="text-gray-700">วันที่สิ้นสุดสัญญา</span>
                    </div>
                    <span className="font-semibold text-gray-900">{contract.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">งวดถัดไป</span>
                    </div>
                    <span className="font-semibold text-gray-900">{contract.nextPaymentDate}</span>
                  </div>
                </div>
              </MobileCard>

              {/* Action Buttons */}
              <div className="space-y-3">
                <MobileButton className="w-full bg-[#EC1B2E] text-white">
                  <FileText className="mr-2 h-5 w-5" />
                  ดาวน์โหลดสัญญา
                </MobileButton>
                <MobileButton variant="outline" className="w-full">
                  <Phone className="mr-2 h-5 w-5" />
                  ติดต่อเจ้าหน้าที่
                </MobileButton>
              </div>
            </div>
          ))}
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/mobile/installment" />
    </MobileLayout>
  )
}
