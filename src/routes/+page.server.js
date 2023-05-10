import { supabase } from '../lib/superclient';

export async function load() {
	const { data } = await supabase.from('countries').select();
	return {
		countries: data ?? []
	};
}
