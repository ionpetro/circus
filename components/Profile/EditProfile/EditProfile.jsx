import React, { useContext, useEffect, useState } from 'react';
import styles from './EditProfile.module.scss';
import axiosInstance from '../../../utils/http-client';
import UserContext from '../../../contexts/UserContext';
import UiInput from '../../Ui/UiInput/UiInput';
import UiTag from '../../Ui/UiTag/UiTag';
import UiButton from '../../Ui/UiButton/UiButton';

import UiUpload from '../../Ui/UiUpload/UiUpload';
import Back from '/public/assets/svgs/back.svg';
import UiSpinner from '../../Ui/UiSpinner/UiSpinner';
import pages from '../../../utils/profile-pages';

const EditProfile = ({ setPage }) => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ status: null, text: '' });
  const [image, setImage] = useState('');

  // initialize form
  useEffect(() => {
    setForm({
      firstname: user?.firstname,
      lastname: user?.lastname,
      username: user?.username,
      email: user?.email,
      category: user?.category,
    });
  }, [user]);

  // upload image to cloudinary and
  // update user image on backend
  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    data.append('folder', `${process.env.NODE_ENV}/users/${user?.id}`);

    try {
      const { secure_url } = await axiosInstance.post(
        'https://api.cloudinary.com/v1_1/ionpetro/image/upload',
        data
      );

      // update user data with the image url
      await updateUser(secure_url);
      setLoading(false);
    } catch (e) {
      setMessage({
        status: 'error',
        text: 'Image could not be uploaded, try again later',
      });
      console.log(e);
      setLoading(false);
    }
  };

  const updateUser = async (imageUrl) => {
    setLoading(true);

    const data = imageUrl ? { ...form, imageUrl } : { ...form };

    try {
      const token = window.localStorage.getItem('token');

      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/users/${user?.id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response);
      setMessage({
        status: 'success',
        text: 'Your profile details were successfully updated!',
      });
      setLoading(false);
    } catch (e) {
      setMessage({
        status: 'error',
        text: 'Something went wrong, try again later',
      });
      setLoading(false);
      console.log(e);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    image ? uploadImage() : updateUser();
  };

  const onTagClick = (category) => {
    setForm({ ...form, category });
  };

  if (loading) {
    return <UiSpinner />;
  }

  return (
    <div className={styles.compWrap}>
      <div className={styles.header}>
        <Back onClick={() => setPage(pages.PROGRAM)} />
        <h3 className={styles.title}>Edit Profile</h3>
      </div>
      {message.text && (
        <div className={styles[message.status]}>{message.text}</div>
      )}
      {user && (
        <form className={styles.form} onSubmit={(e) => submitForm(e)}>
          <div className={styles.inputs}>
            <UiInput
              required
              label={true}
              name={'firstname'}
              value={form.firstname}
              placeholder={'first name'}
              type={'text'}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />
            <UiInput
              required
              label={true}
              name={'lastname'}
              placeholder={'last name'}
              value={form.lastname}
              type={'text'}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />
            <UiInput
              required
              label={true}
              name={'email'}
              value={form.email}
              type={'email'}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <UiInput
              required
              label={true}
              name={'username'}
              value={form.username}
              type={'username'}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <UiUpload setImageCallback={setImage} />
            <div>
              <div className={styles.category}>body category</div>
              <div className={styles.tags}>
                <UiTag
                  selected={form.category === 'below60'}
                  onClick={() => onTagClick('below60')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below60') : null
                  }
                >
                  {'<60kg'}
                </UiTag>
                <UiTag
                  selected={form.category === 'below80'}
                  onClick={() => onTagClick('below80')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below80') : null
                  }
                >
                  {'<80kg'}
                </UiTag>
                <UiTag
                  selected={form.category === 'below100'}
                  onClick={() => onTagClick('below100')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('below100') : null
                  }
                >
                  {'<100kg'}
                </UiTag>
                <UiTag
                  selected={form.category === 'above100'}
                  onClick={() => onTagClick('above100')}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? onTagClick('above100') : null
                  }
                >
                  {'>100kg'}
                </UiTag>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <a onClick={() => setPage(pages.PROGRAM)}>Cancel</a>
            <UiButton>Save</UiButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
