'use client';

import { useState } from 'react';
import { Button, Popover, ActionIcon, Title, Text } from 'rizzui';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  deleteModelKey,
  fetchTraincoreApiKeys,
} from '@/redux/slices/configSlice';
import { BiDotsVertical } from 'react-icons/bi';
import { useCopyToClipboard } from 'react-use';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

type DeletePopoverProps = {
  title?: string;
  description?: string;
  handleRemoveField?: () => void;
  handleCopyToClipboard?: () => void;
  configId: string;
  name?: string;
  keyType: 'trainkore' | 'modelProvider';
  secretKey?: string;
};

export default function ThreeDotsPopOver({
  title,
  description,
  handleRemoveField,
  handleCopyToClipboard,
  configId,
  name,
  keyType,
  secretKey,
}: DeletePopoverProps) {
  const [isCopied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopy(value: string) {
    copyToClipboard(value);
    toast.success(
      <b className="break-all">{`Copied ${value} to clipboard`}</b>
    );
    setCopied(() => true);
    setTimeout(() => {
      setCopied(() => false);
    }, 300);
  }

  const handleDelete = async () => {
    try {
      // const encodedApiKey = encodeURIComponent(name as string);
      // const deleteEndpoint =
      //   keyType === 'trainkore'
      //     ? `/api/configs/${configId}/trainkore-keys/${encodedApiKey}`
      //     : `/api/configs/${configId}/model-provider-keys/${name}`;

      // const response = await axiosInstance.delete(deleteEndpoint);
      // console.log(response, 'delete response');
      // await dispatch(fetchTraincoreApiKeys(userId as any) as any);
      const response = await dispatch(
        deleteModelKey({ configId, keyType, name }) as any
      );

      console.log(response, 'delete response');
      toast.success(`${name} Deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Popover
    //   placement="bottom"
    //   className="z-50"
    //   content={({ setIsOpen }) => (
    //     <div className="text-left rtl:text-right">
    //       <div className="flex flex-col items-start">
    //         <Button variant="text" size="sm" onClick={handleDelete}>
    //           Remove
    //         </Button>
    //       </div>
    //       {keyType === 'trainkore' && (
    //         <Button
    //           variant="text"
    //           size="sm"
    //           onClick={() => handleCopy(secretKey || '')}
    //         >
    //           Copy
    //         </Button>
    //       )}
    //     </div>
    //   )}
    // >
    //   <ActionIcon
    //     size="sm"
    //     variant="outline"
    //     aria-label={'New User ID'}
    //     className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
    //   >
    //     <BiDotsVertical className="h-4 w-4" />
    //   </ActionIcon>
    // </Popover>
    <Popover isOpen={isOpen} setIsOpen={setIsOpen} size="sm">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'New User ID'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        >
          <BiDotsVertical className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content>
        <div className="text-left rtl:text-right">
          <div className="flex flex-col items-start">
            <Button variant="text" size="sm" onClick={handleDelete}>
              Remove
            </Button>
          </div>
          {keyType === 'trainkore' && (
            <Button
              variant="text"
              size="sm"
              onClick={() => handleCopy(secretKey || '')}
            >
              Copy
            </Button>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
}
