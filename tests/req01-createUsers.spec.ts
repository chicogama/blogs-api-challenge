import { describe, it, beforeEach, expect } from 'vitest'
import frisby from 'frisby'

import { truncateDatabase } from './db/utils'

const url = 'http://localhost:3000'

describe('1 - Sua aplicação deve ter o endpoint POST `/user`', () => {
  beforeEach(async () => {
    await truncateDatabase()
  })

  it('Será validado que é possível cadastrar um usuário com sucesso', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response
        expect(json.token).not.toBeNull()
      })
  })

  it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"displayName" length must be at least 8 characters long')
      })
  })

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"email" must be a valid email')
      })
  })

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: '@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"email" must be a valid email')
      })
  })

  it('Será validado que o campo `email` é obrigatório', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"email" is required')
      })
  })

  it('Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '12345',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"password" length must be 6 characters long')
      })
  })

  it('Será validado que o campo `password` é obrigatório', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response
        expect(json.message).toBe('"password" is required')
      })
  })

  it('Validar que não é possível cadastrar um usuário com email já existente', () => {
    return frisby
      .post(`${url}/user`,
        {
          displayName: 'Rubinho Barrichello',
          email: 'rubinho@gmail.com',
          password: '123456',
          image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
        })
      .expect('status', 201)
      .then(() => {
        return frisby
          .post(`${url}/user`,
            {
              displayName: 'Rubinho Barrichello',
              email: 'rubinho@gmail.com',
              password: '123456',
              image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
            })
          .expect('status', 409)
          .then((response) => {
            const { json } = response
            expect(json.message).toBe('User already registered')
          })
      })
  })
})