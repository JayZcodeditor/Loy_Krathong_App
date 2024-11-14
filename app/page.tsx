import Title from './components/Title/Title'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Title />
      <div className="mb-20 flex justify-center w-full">
        <button className='bg-white rounded-lg p-2 text-2xl hover:bg-gray-100 transition-colors'>
          สร้างกระทง
        </button>
      </div>
    </div>
  );
}
