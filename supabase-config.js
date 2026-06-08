// KEP v4.0 — Supabase client configuration. Use only the public anon key.
(function(){
  window.KEP_DB = {
    getConfig(){ return { url: localStorage.getItem('kepSupabaseUrl') || '', anonKey: localStorage.getItem('kepSupabaseAnonKey') || '' }; },
    saveConfig(url, anonKey){ localStorage.setItem('kepSupabaseUrl', (url||'').trim()); localStorage.setItem('kepSupabaseAnonKey', (anonKey||'').trim()); },
    clearConfig(){ localStorage.removeItem('kepSupabaseUrl'); localStorage.removeItem('kepSupabaseAnonKey'); },
    client(){
      const cfg = this.getConfig();
      if(!cfg.url || !cfg.anonKey) throw new Error('Supabase URL and anon key are missing. Open Database Setup first.');
      if(!window.supabase?.createClient) throw new Error('Supabase library did not load. Check internet connection.');
      return window.supabase.createClient(cfg.url, cfg.anonKey);
    }
  };
})();
