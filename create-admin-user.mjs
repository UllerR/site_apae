import { createUserWithPassword } from './server/db.ts';
import crypto from 'crypto';

async function createAdminUser() {
  const email = 'uller_@live.com';
  const password = 'Apae@2024!Secure';
  const name = 'Administrador APAE';

  try {
    await createUserWithPassword(email, password, name, 'admin');
    console.log('\n✅ Usuário Admin criado com sucesso!\n');
    console.log('📧 Email:', email);
    console.log('🔐 Senha:', password);
    console.log('\n⚠️  Guarde essas credenciais com segurança!');
    console.log('💾 Você pode alterar a senha depois fazendo login.\n');
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
  }
}

createAdminUser();
