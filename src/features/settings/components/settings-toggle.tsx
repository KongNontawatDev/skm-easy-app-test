import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface SettingsToggleProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function SettingsToggle({ 
  id, 
  label, 
  description, 
  checked, 
  onCheckedChange, 
  disabled,
  className 
}: SettingsToggleProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">
        <Label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  )
}
