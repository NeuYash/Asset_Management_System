import { Asset } from './Asset'
import { Employee } from './Employee'

export class AssetAllocation {
    allocationId: number
    assetId: number
    asset: Asset
    empId: number
    employee: Employee
    status: string
    remark: string
    message: any
}