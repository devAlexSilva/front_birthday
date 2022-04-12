import { useForm } from 'react-hook-form';
import styles from '../../../styles/DashBoard.module.css'
import Router from 'next/router';
import Layout from '../../../components/Layout';
import { axiosClient } from '../../../api/axiosServerSide';
import { parseCookies } from 'nookies';
import { api } from '../../../api/axiosClientSide';

export default function UpdateMessage({ id, data }) {

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: `${data.title}`,
      content: `${data.content}`,
      dateBirthday: `${data.dateBirthday}`
    }
  });

  async function update(dataForm) {

    const dateLocal = dataForm.dateBirthday;
    dataForm.dateBirthday = dateLocal.split('-').reverse().join('/');

    const { data } = await api.put(`/message/update/${id}`, dataForm);

    data.status === 200 ? Router.push('/dashBoard')
      : alert('falha ao criar');
  }

  return (
    <Layout>
      <section className={styles.section}>
        <form className={styles.card} onSubmit={handleSubmit(update)}>

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


export async function getServerSideProps(ctx) {
  const api = axiosClient(ctx);
  const { user } = parseCookies(ctx);
  const { id } = ctx.params

  if (!user) return {
    redirect: {
      destination: '/'
    }
  }

  const { data } = await api.get(`/message/${id}`);

  return {
    props: { id, data }
  }
}