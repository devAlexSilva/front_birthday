import { useForm } from 'react-hook-form';
import styles from '../../styles/DashBoard.module.css'
import Router from 'next/router';
import { api } from '../../api/axiosClientSide';
import Layout from '../../components/Layout'

export default function CreateMessage() {

  const { register, handleSubmit } = useForm();

  async function create(dataForm) {

    const dateLocal = dataForm.dateBirthday;
    dataForm.dateBirthday = dateLocal.split('-').reverse().join('/');

    const { data } = await api.post('/message/create', dataForm);

    data.status === 201 ? await Router.push('/dashBoard')
      : alert('falha ao criar');
  }

  return (
    <Layout>
      <section className={styles.section}>
        <form className={styles.card} onSubmit={handleSubmit(create)}>

          <ul className={styles.card_info}>
            <li className={styles.inputField}>
              <label htmlFor="title">
                Titulo do Lembrete
              </label>
              <input
                {...register('title')}
                id="title"
                name="title"
                type="text"
                required
                placeholder="aniversário do Jhon"
              />
            </li>
            <li className={styles.inputField}>
              <label htmlFor="content">
                Descrição
              </label>
              <input
                {...register('content')}
                id="content"
                name="content"
                type="text"
                placeholder="Esse ano jhon vai querer uma taça nova"
              />
            </li>
            <li className={styles.inputField}>
              <label htmlFor="dateBirthday">
                Data do Aniversário
              </label>
              <input
                {...register('dateBirthday')}
                id="dateBirthday"
                name="dateBirthday"
                type="date"
                placeholder="20/02/1997"
              />
            </li>
          </ul>
          <div className={styles.card_buttons}>
            <button>
              Salvar
            </button>
          </div>
        </form>
      </section>
    </Layout>
  )
}