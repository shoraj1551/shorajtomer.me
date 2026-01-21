import { SupabaseClient } from '@supabase/supabase-js'
import { BaseService } from './base.service'
import { Project } from '@/types'
import { AppError } from '@/lib/errors'

export class ProjectService extends BaseService<Project> {
    constructor(supabase: SupabaseClient) {
        super(supabase, 'projects')
    }

    /**
     * Get published projects (no specific 'published' flag in schema, using status != Archived if needed, or just all for now via logic)
     * Schema has 'status' field: 'Active Development', 'Beta', 'Live', 'Archived'
     */
    async getPublished() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .neq('status', 'Archived') // Assuming we show everything except archived
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Project[]
        } catch (error: any) {
            console.error('Error fetching projects FULL:', JSON.stringify(error, null, 2))
            console.error('Error message:', error.message)
            console.error('Error hint:', error.hint)
            throw new AppError(500, `Failed to fetch projects: ${error.message || 'Unknown error'}`)
        }
    }

    /**
     * Get featured projects
     */
    async getFeatured() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .eq('is_featured', true)
                .neq('status', 'Archived')
                .order('sort_order', { ascending: true })

            if (error) throw error
            return data as Project[]
        } catch (error) {
            console.error('Error fetching featured projects:', error)
            throw new AppError(500, 'Failed to fetch featured projects')
        }
    }
}
