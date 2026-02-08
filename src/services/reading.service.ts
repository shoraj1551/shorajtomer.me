import { SupabaseClient } from '@supabase/supabase-js'
import { BaseService } from './base.service'
import { Reading } from '@/types'
import { AppError } from '@/lib/errors'

export class ReadingService extends BaseService<Reading> {
    constructor(supabase: SupabaseClient) {
        super(supabase, 'readings')
    }

    /**
     * Get all readings organized by category
     */
    async getAllWithCategories() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*, category:categories(*)')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Reading[]
        } catch (error) {
            console.error('Error fetching readings:', error)
            throw new AppError(500, 'Failed to fetch readings')
        }
    }
}
