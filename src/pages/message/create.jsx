import { useForm } from 'react-hook-form';
import styles from '../../styles/Home.module.css'
import Router from 'next/router';
import Link from 'next/link';
import { api } from '../../api/axiosClientSide';


export default function CreateMessage() {

  const { register, handleSubmit } = useForm();

  async function create(dataForm) {

    const dateLocal = dataForm.dateBirthday;
    dataForm.dateBirthday = dateLocal.split('-').reverse().join('/');

    const { data } = await api.post('/message/create', dataForm);

    data.status === 201 ? Router.push('/dashBoard')
      : alert('falha ao criar');
  }

  return (
    <div className={styles.body}>
      <section className={styles.section}>
        <form className={styles.form} onSubmit={handleSubmit(create)}>

          <div>
            <div className={styles.inputField}>
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
            </div>
            <div className={styles.inputField}>
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
            </div>
            <div className={styles.inputField}>
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
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button>
              Salvar
            </button>
          </div>
        </form>
        <Link href='/dashBoard'>
          <button>
            dashBoard
          </button>
        </Link>
      </section>
    </div>
  )
}