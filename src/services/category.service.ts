import { SupabaseClient } from '@supabase/supabase-js'
import { BaseService } from './base.service'
import { Category } from '@/types'

export class CategoryService extends BaseService<Category> {
    constructor(supabase: SupabaseClient) {
        super(supabase, 'categories')
    }
}
