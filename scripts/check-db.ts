
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
    console.log('Checking projects table...')
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching projects:', JSON.stringify(error, null, 2))
        console.error('Code:', error.code)
        console.error('Message:', error.message)
        console.error('Details:', error.details)
        console.error('Hint:', error.hint)
    } else {
        console.log('Success! Projects found:', data?.length)
        console.log('Data:', data)
    }
}

check()
