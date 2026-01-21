import { SupabaseClient } from '@supabase/supabase-js'
import { BaseService } from './base.service'
import { Service } from '@/types'
import { AppError } from '@/lib/errors'

export class ServiceService extends BaseService<Service> {
    constructor(supabase: SupabaseClient) {
        super(supabase, 'services')
    }

    /**
     * Get active services
     */
    async getActive() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })

            if (error) throw error
            return data as Service[]
        } catch (error) {
            console.error('Error fetching services:', error)
            throw new AppError(500, 'Failed to fetch services')
        }
    }
}
