import { createUserWithPassword } from './server/db.ts';
import crypto from 'crypto';

async function createApaeUser() {
  const email = 'apae@itajai.com.br';
  const password = crypto.randomBytes(12).toString('hex');
  const name = 'APAE Itajaí';

  try {
    await createUserWithPassword(email, password, name, 'admin');
    console.log('\n✅ Usuário APAE criado com sucesso!\n');
    console.log('📧 Email:', email);
    console.log('🔐 Senha:', password);
    console.log('\n⚠️  Guarde essas credenciais com segurança!');
    console.log('💾 Você pode alterar a senha depois fazendo login.\n');
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
  }
}

createApaeUser();
