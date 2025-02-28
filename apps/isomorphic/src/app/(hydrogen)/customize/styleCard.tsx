'use client';

import {
  ActionIcon,
  Button,
  FileInput,
  Input,
  Select,
  Text,
  Textarea,
  Title,
} from 'rizzui';
import WidgetCard from '@core/components/cards/widget-card';
import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  BarChart,
  XAxis,
  Bar,
} from 'recharts';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import { formatNumber } from '@core/utils/format-number';
import { CustomYAxisTick } from '@core/components/charts/custom-yaxis-tick';
import FacebookIcon from '@core/components/icons/facebook';
import TwitterIcon from '@core/components/icons/twitter';
import InstagramIcon from '@core/components/icons/instagram';
import LinkedinIcon from '@core/components/icons/linkedin';
import { useMedia } from '@core/hooks/use-media';
import SimpleBar from '@core/ui/simplebar';
import { HiPaintBrush } from 'react-icons/hi2';
import { PiPaletteBold } from 'react-icons/pi';
import { HexColorPicker } from 'react-colorful';

import { Dispatch, SetStateAction, useState } from 'react';
import Popover from '@core/ui/carbon-menu/popover/popover';
import { BiDotsVertical } from 'react-icons/bi';
import Header from './header';
import MakePost from './makePost';

export default function StyleCard({
  bgColor,
  setBgColor,
  className,
  textColor,
  setTextColor,
  imageSrc,
  setImageSrc,
  changeContentBgColor,
  setChangeContentBgColor,
  setButtonShape,
  buttonShape,
  setIsToggle,
  setBadgeBottom,
  setBadgeTop,
  badgeTop,
  badgeBottom,
  selectedFont,
  setSelectedFont,
  height,
  setHeight,
  borderRadius,
  setInputRadius,
  setBorderRadius,
  inputRadius,
  chatbotTitle,
  chatbotDescription,
  setChatbotTitle,
  setChatbotDescription,
  chatbotAlignMent,
  setChatbotAlignment,
}: {
  inputRadius: string;
  bgColor: string;
  className?: string;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  setBgColor: Dispatch<SetStateAction<string>>;
  imageSrc: string;
  setImageSrc: Dispatch<SetStateAction<string>>;
  changeContentBgColor: string;
  setChangeContentBgColor: Dispatch<SetStateAction<string>>;
  setButtonShape: Dispatch<SetStateAction<string>>;
  buttonShape: string;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  setBadgeBottom: Dispatch<SetStateAction<string>>;
  setBadgeTop: Dispatch<SetStateAction<string>>;
  badgeTop: string;
  badgeBottom: string;
  selectedFont: string;
  setSelectedFont: Dispatch<SetStateAction<string>>;
  height: string;
  setHeight: Dispatch<SetStateAction<string>>;
  borderRadius: string;
  setBorderRadius: Dispatch<SetStateAction<string>>;
  setInputRadius: Dispatch<SetStateAction<string>>;
  chatbotTitle: string;
  chatbotDescription: string;
  setChatbotTitle: Dispatch<SetStateAction<string>>;
  setChatbotDescription: Dispatch<SetStateAction<string>>;
  chatbotAlignMent: string;
  setChatbotAlignment: Dispatch<SetStateAction<string>>;
}) {
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Set the new image source to the base64 encoded image
      };
      reader.readAsDataURL(file); // Convert the file to a data URL (base64)
    }
  };
  const [isOpen, setIsOpen] = useState();
  const isSM = useMedia('(max-width: 640px)', false);
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  function barSize() {
    if (is2XL) return 24;
    if (isLg || isMobile) return 32;
    if (isTab) return 40;
  }

  const [inputColor, setInputColor] = useState<string>(
    'bg-gradient-to-r from-purple-400 to-blue-500'
  );
  const [inputTextColor, setInputTextColor] = useState<string>('text-white');

  const [inputContentBgColor, setInputContentBgColor] =
    useState<string>('bg-white');

  const [inputBadgeTop, setInputBadgeTop] = useState(badgeTop);
  const [inputBadgeBottom, setInputBadgeBottom] = useState(badgeBottom);
  const [chatBotHeight, setChatbotHeight] = useState(height);

  const handleBadgeTopChange = (color: string) => {
    setBadgeTop(color);
    setIsToggle(false);
  };

  const handleHeight = (color: string) => {
    setChatbotHeight(color);
  };

  const handleBadgeBottomChange = (color: string) => {
    setInputBadgeBottom(color);
  };

  const applyCustomBadgeTopInputChange = () => {};

  const applyChatbotHeight = () => {
    setHeight(chatBotHeight);
  };

  const applyCustomBadgeBottomInputChange = () => {
    setBadgeBottom(inputBadgeBottom);
  };

  const handleColorChange = (color: string) => {
    setInputColor(color);
  };

  const handleInputTextColorChange = (color: string) => {
    setInputTextColor(color);
  };

  const handleContentBgChange = (color: string) => {
    setInputContentBgColor(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextColor(e.target.value);
  };
  const handleFontChange = (fontClass: string) => {
    setSelectedFont(fontClass);
  };
  const handleContentBgInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputContentBgColor(e.target.value);
  };

  const applyCustomColor = () => {
    setBgColor(inputColor);
  };

  const applyCustomTextColor = () => {
    setTextColor(inputTextColor);
  };

  const applyContentCustomBgColor = () => {
    setChangeContentBgColor(inputContentBgColor);
  };

  const toggleButtonShape = (shape: string) => {
    setButtonShape(shape);
    setIsToggle(false);
  };

  const fonts = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Lucida Console',
    'Comic Sans MS',
    'Impact',
  ];

  return (
    <WidgetCard
      title={
        <div className="flex items-center gap-2">
          <PiPaletteBold className="h-5 w-5 text-blue-500" /> Style
        </div>
      }
      titleClassName="font-medium sm:text-lg text-gray-800 mb-2.5 font-inter"
      className={className}
    >
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBgColor('bg-gray-500');
              setBadgeTop('bg-gray-500');
            }}
            rounded="pill"
            className="flex items-center gap-2 border hover:border-gray-500 hover:text-gray-500"
          >
            <span className="h-3 w-3 rounded-full bg-gray-500"></span>
            Charcoal
          </Button>
          <Button
            variant="outline"
            size="sm"
            rounded="pill"
            onClick={() => {
              setBgColor('bg-blue-500');
              setBadgeTop('bg-blue-500');
            }}
            className="flex items-center gap-2 border hover:border-blue-500 hover:text-blue-500"
          >
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            Blue
          </Button>
          <Button
            variant="outline"
            size="sm"
            rounded="pill"
            onClick={() => {
              setBgColor('bg-orange-500');
              setBadgeTop('bg-orange-500');
            }}
            className="flex items-center gap-2 border hover:border-orange-500 hover:text-orange-500"
          >
            <span className="h-3 w-3 rounded-full bg-orange-500"></span>
            Orange
          </Button>
          <Button
            variant="outline"
            size="sm"
            rounded="pill"
            onClick={() => {
              setBgColor('bg-green-500');
              setBadgeTop('bg-green-500');
            }}
            className="flex items-center gap-2 border hover:border-green-500 hover:text-green-500"
          >
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            Green
          </Button>
          {/* <Button
            variant="outline"
            size="sm"
            rounded="pill"
            onClick={() => {
              setBgColor('bg-gradient-to-r from-blue-400 to-purple-600');
              setBadgeTop('bg-gradient-to-r from-blue-400 to-purple-600');
            }}
            className="flex items-center gap-2 border hover:border-gray-900 hover:text-gray-900"
          >
            <span className="h-3 w-3 rounded-full bg-gray-900"></span>
            Gradient
          </Button> */}

          <div className="flex flex-col items-center gap-8">
            <select
              id="font-picker"
              className="w-32 rounded-full p-2 text-xs"
              value={badgeTop}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setBgColor(e.target.value);
                setBadgeTop(e.target.value);
              }}
            >
              <option
                value="bg-gradient-to-r from-blue-400 to-purple-600"
                className="text-xs"
              >
                Ocean Breeze
              </option>
              <option
                value="bg-gradient-to-r from-pink-500 to-yellow-500"
                className="text-xs"
              >
                Sunset Glow
              </option>
              <option
                value="bg-gradient-to-r from-green-400 to-blue-500"
                className="text-xs"
              >
                Emerald Sky
              </option>
              <option
                value="bg-gradient-to-r from-red-500 to-orange-500"
                className="text-xs"
              >
                Fiery Sunset
              </option>
              <option
                value="bg-gradient-to-r from-indigo-500 to-purple-700"
                className="text-xs"
              >
                Royal Twilight
              </option>
              <option
                value="bg-gradient-to-r from-teal-400 to-cyan-500"
                className="text-xs"
              >
                Aqua Flow
              </option>
              <option
                value="bg-gradient-to-r from-yellow-400 to-red-500"
                className="text-xs"
              >
                Golden Hour
              </option>
              <option
                value="bg-gradient-to-r from-lime-500 to-green-500"
                className="text-xs"
              >
                Fresh Meadow
              </option>
              <option
                value="bg-gradient-to-r from-rose-400 to-pink-500"
                className="text-xs"
              >
                Rose Petal
              </option>
              <option
                value="bg-gradient-to-r from-sky-400 to-indigo-500"
                className="text-xs"
              >
                Skyline Dusk
              </option>
            </select>
          </div>
        </div>
        <div className="mb-4 mt-4 grid grid-cols-1 items-center justify-between gap-6 border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0 md:grid-cols-2">
          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Background
            </Text>
            <Popover>
              <Popover.Trigger>
                <Button
                  variant="outline"
                  className={`h-7 w-16 ${bgColor.startsWith('bg-') ? bgColor : ''}`}
                  style={{
                    backgroundColor: !bgColor.startsWith('bg-') ? bgColor : '',
                  }}
                ></Button>
              </Popover.Trigger>
              <Popover.Content>
                <div>
                  <HexColorPicker
                    color={bgColor.startsWith('bg-') ? '#ffffff' : bgColor}
                    onChange={(e) => {
                      handleColorChange(e);
                      applyCustomColor();
                      setBadgeTop(bgColor);
                    }}
                  />
                  <div className="mt-4 flex items-center">
                    <Input
                      size="sm"
                      type="text"
                      value={inputColor}
                      onChange={(e) => {
                        handleInputChange(e);
                        setInputBadgeTop(e.target.value);
                      }}
                      placeholder="#FFFFFF"
                      className="rounded"
                    />
                  </div>
                </div>
              </Popover.Content>
            </Popover>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Logo
            </Text>
            <div className="flex flex-col">
              <FileInput
                size="sm"
                variant="outline"
                id="file-upload"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Text
            </Text>
            <Popover>
              <Popover.Trigger>
                <Button
                  variant="outline"
                  className="h-7 w-16"
                  style={{ background: textColor }}
                ></Button>
              </Popover.Trigger>
              <Popover.Content>
                <div>
                  <HexColorPicker
                    color={textColor}
                    onChange={(e) => {
                      handleInputTextColorChange(e);
                      applyCustomTextColor();
                    }}
                  />
                  <div className="mt-4 flex items-center">
                    <Input
                      size="sm"
                      type="text"
                      value={inputTextColor}
                      onChange={handleTextInputChange}
                      placeholder="#FFFFFF"
                      className="rounded"
                    />
                  </div>
                </div>
              </Popover.Content>
            </Popover>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Font
            </Text>
            <div className="flex items-center">
              <select
                id="font-picker"
                className="rounded-md border p-2 text-xs"
                onChange={(e) => setSelectedFont(e.target.value)}
              >
                {fonts.map((font, index) => (
                  <option key={index} value={font} className="text-xs">
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Chatbot Alignment
            </Text>
            <div className="flex items-center">
              <select
                id="chatbot-alignment-picker"
                className="min-w-[100px] rounded-md border p-2 text-xs"
                value={chatbotAlignMent}
                onChange={(e) => {
                  setChatbotAlignment(e.target.value);
                  setIsToggle(false);
                }}
              >
                <option value="right" className="text-xs">
                  Right
                </option>
                <option value="left" className="text-xs">
                  Left
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Badge
            </Text>
            <Popover>
              <Popover.Trigger>
                <Button
                  variant="outline"
                  className="h-7 w-16"
                  style={{ background: badgeTop }}
                ></Button>
              </Popover.Trigger>
              <Popover.Content>
                <div>
                  <HexColorPicker
                    color={inputBadgeTop}
                    onChange={handleBadgeTopChange}
                  />
                  <div className="mt-4 flex items-center">
                    <Input
                      size="sm"
                      type="text"
                      value={inputBadgeTop}
                      onChange={(e) => setInputBadgeTop(e.target.value)}
                      placeholder="#FFFFFF"
                      className="rounded"
                    />
                  </div>
                </div>
              </Popover.Content>
            </Popover>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Height
            </Text>
            <div className="flex items-center">
              <select
                id="height-picker"
                className="w-24 rounded-md border p-2 text-xs"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              >
                <option value="400" className="text-xs">
                  Small
                </option>
                <option value="450" className="text-xs">
                  Medium
                </option>
                <option value="500" className="text-xs">
                  Large
                </option>
                <option value="550" className="text-xs">
                  XL
                </option>
                <option value="600" className="text-xs">
                  2XL
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Border Radius
            </Text>
            <div className="flex items-center">
              <select
                id="border-radius-picker"
                className="w-24 rounded-md border p-2 text-xs"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
              >
                <option value="0.125rem" className="text-xs">
                  Small
                </option>
                <option value="0.375rem" className="text-xs">
                  Medium
                </option>
                <option value="0.5rem" className="text-xs">
                  Large
                </option>
                <option value="1rem" className="text-xs">
                  XL
                </option>
                <option value="1.5rem" className="text-xs">
                  2XL
                </option>
                <option value="2rem" className="text-xs">
                  3XL
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Chat Shape
            </Text>
            <div className="flex flex-col items-center gap-8">
              <select
                id="chat-shape-picker"
                className="w-24 rounded-md border p-2 text-xs"
                value={buttonShape}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  toggleButtonShape(e.target.value)
                }
              >
                <option value="rounded" className="text-xs">
                  Rounded
                </option>
                <option value="rectangle" className="text-xs">
                  Rectangle
                </option>
                <option value="semiCircle" className="text-xs">
                  Semi circle
                </option>
                <option value="sidebar" className="text-xs">
                  Sidebar
                </option>
                <option value="text" className="text-xs">
                  Text
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-lg border-2 border-gray-200 p-2">
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span className="h-2.5 w-2.5 rounded-full" />
              Input Radius
            </Text>
            <div className="flex items-center">
              <select
                id="input-radius-picker"
                className="w-24 rounded-md border p-2 text-xs"
                value={inputRadius}
                onChange={(e) => setInputRadius(e.target.value)}
              >
                <option value="sm" className="text-xs">
                  Small
                </option>
                <option value="md" className="text-xs">
                  Medium
                </option>
                <option value="lg" className="text-xs">
                  Large
                </option>
                <option value="full" className="text-xs">
                  Rounded
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-6">
            <Text className="mt-2 w-32 flex-shrink-0 font-semibold">
              Header
            </Text>
            <Input
              className="flex-1"
              value={chatbotTitle}
              onChange={(e) => setChatbotTitle(e.target.value)}
            />
          </div>
          <div className="flex items-start gap-6">
            <Text className="mt-2 w-32 flex-shrink-0 font-semibold">
              Message
            </Text>
            <Input
              className="flex-1"
              value={chatbotDescription}
              onChange={(e) => setChatbotDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
