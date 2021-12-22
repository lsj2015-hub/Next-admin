import BaseLayout from '../../components/containers/BaseLayout';
import { Button, Form, Input } from 'antd';
import firebaseApp from '../../net/firebaseApp';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uid from 'tiny-uid';
import { DateTime } from 'luxon';
import { useState } from 'react';
import Image from 'next/image';

export default function PortfoioForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <BaseLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          const firestore = getFirestore(firebaseApp);
          const portfolios = collection(firestore, 'portfolios');
          addDoc(portfolios, {
            ...values,
            thumbnail,
            created_at: new Date(),
            updated_at: new Date(),
          })
            .then(() => router.back())
            .catch(console.warn);

          console.log('values', values);
        }}
      >
        <Form.Item label="대표 이미지" required>
          <input
            type="file"
            onChange={async (e) => {
              if (e.target.files.length === 0) return;
              const storage = getStorage(firebaseApp);
              const file = e.target.files[0];
              const dir = DateTime.now().toFormat('yy/LL/');
              const split = file.name.split('.');
              const savedPath = `/${dir}${encodeURIComponent(
                split[0]
              )}-${uid()}.${split[1]}`;
              const fileRef = ref(storage, savedPath);
              await uploadBytes(fileRef, file);
              const url = await getDownloadURL(fileRef);
              setThumbnail(url);
            }}
          />
          {thumbnail && (
            <img
              src={thumbnail}
              style={{ maxWidth: 200, maxHight: 200 }}
              alt=""
            />
          )}
        </Form.Item>
        <Form.Item label="제목" required name="subject">
          <Input />
        </Form.Item>
        <Form.Item label="설명" required name="content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            전송
          </Button>
        </Form.Item>
      </Form>
    </BaseLayout>
  );
}
