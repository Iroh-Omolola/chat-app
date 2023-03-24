import { createClient } from '@supabase/supabase-js'
import {REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from './constant'

if (!REACT_APP_SUPABASE_URL) throw new Error('Missing env.REACT_APP_SUPABASE_URL')
if (!REACT_APP_SUPABASE_KEY) throw new Error('Missing env.REACT_APP_SUPABASE_KEY')

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY)