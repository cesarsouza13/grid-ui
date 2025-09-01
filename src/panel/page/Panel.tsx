import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { PanelService } from "../service/panel.service";
import { useUser } from "../../core/hooks/useUser";
import { useToast } from "../../core/context/AlertContext";

type Region = "SUDESTE" | "SUL" | "NORTE" | "NORDESTE";

interface SeriesData {
  name: Region;
  data: { x: string; y: number }[];
}

const Panel: React.FC = () => {
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const {showToast} = useToast();
  const user = useUser();

  const downloadCsv = async () => {
    try {
      const csvString = await PanelService.getCsvReport(); // string CSV do backend
  
      // Cria um Blob do tipo CSV
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "monthly_prices.csv"; // nome do arquivo
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast({type:"success", message: "Dados coletados com sucesso"})
    } catch (err) {
      showToast({type:"error", message: "Erro ao baixar o csv"})
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PanelService.getReport()

        const regions: Region[] = ["SUDESTE", "SUL", "NORTE", "NORDESTE"];

        const grouped: SeriesData[] = regions.map((region) => ({
          name: region,
          data: data
          .filter((d) => d.region === region)
          .map((d) => ({
            x: d.date.slice(5, 7) + "/" + d.date.slice(2, 4),
            y: Number(d.price),
          })),
      }));

        setSeries(grouped);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",

      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `R$ ${val.toFixed(2)}`,
      style: {
        colors: ["#333"], // texto preto/cinza escuro
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      type: "category",
      title: { text: "Mês/Ano" },
    },
    yaxis: {
      title: { text: "Preço Médio" },
    },
    legend: { position: "top" },
    tooltip: {
      y: {
        formatter: (val: number) => `R$ ${val.toFixed(2)}`,
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center min-h-screen bg-gray-50 p-5">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Bem-vindo, {user?.name}!
        </h2>
        <p className="text-gray-600 mt-2">
          Este painel apresenta dados de monitoramento de preços do mercado de energia, permitindo acompanhar variações e tendências mensalmente.
        </p>
      </header>
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full ">
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-2xl font-bold text-gray-800">
          Painel de Preços Mensais
        </h1>
        <button
          onClick={downloadCsv}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
         Baixar CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-20">Carregando...</p>
      ) : (
        <Chart options={options} series={series} type="bar" height={400}  />
      )}
    </div>
  </div>
  );
};

export default Panel;
