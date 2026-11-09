import React, { useEffect, useState } from 'react';
import { Network, Info, Database, Award, Layers } from 'lucide-react';

interface PairResult {
    sensorA: string;
    sensorB: string;
    kamRmse?: number;
    kfmRmse?: number;
    combinedRmse?: number;
}

interface RankingFile {
    source?: string;
    units?: string;
    results: PairResult[];
}

const SENSOR_LOCATIONS = [
    'Left Foot',
    'Right Foot',
    'Left Shank',
    'Right Shank',
    'Left Thigh',
    'Right Thigh',
    'Waist',
    'Chest',
];

const generatePairs = () => {
    const pairs: { sensorA: string; sensorB: string }[] = [];

    for (let i = 0; i < SENSOR_LOCATIONS.length; i++) {
        for (let j = i + 1; j < SENSOR_LOCATIONS.length; j++) {
            pairs.push({
                sensorA: SENSOR_LOCATIONS[i],
                sensorB: SENSOR_LOCATIONS[j],
            });
        }
    }

    return pairs;
};

const ALL_PAIRS = generatePairs();

const formatMetric = (value?: number) =>
    typeof value === 'number' && Number.isFinite(value)
        ? value.toFixed(3)
        : '–';

export const SensorPairRanking: React.FC = () => {
    const [rankingData, setRankingData] = useState<RankingFile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetch('/sensor_pair_ranking.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ranking results file not found');
                }
                return response.json();
            })
            .then((data: RankingFile) => {
                if (
                    !Array.isArray(data.results) ||
                    !data.results.every(
                        (item) =>
                            typeof item.sensorA === 'string' &&
                            typeof item.sensorB === 'string'
                    )
                ) {
                    throw new Error('Invalid ranking results format');
                }

                if (!cancelled) {
                    setRankingData(data);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setRankingData(null);
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const getResult = (sensorA: string, sensorB: string) => {
        return rankingData?.results.find(
            (result) =>
                (result.sensorA === sensorA && result.sensorB === sensorB) ||
                (result.sensorA === sensorB && result.sensorB === sensorA)
        );
    };

    const hasResults = Boolean(rankingData?.results.length);

    return (
        <div className="space-y-6">
            {/* Page Heading */}
            <div>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[#172B4D] text-white">
                        <Network className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#172B4D]">
                            Sensor Pair Ranking
                        </h1>
                        <p className="text-sm text-[#718096] mt-1">
                            Evaluation of possible two-IMU configurations
                        </p>
                    </div>
                </div>
            </div>

            {/* Information Banner */}
            <div className="p-4 rounded-lg border border-[#F3D5BD] bg-[#FFF8F2] flex gap-3">
                <Info className="w-5 h-5 text-[#E87532] shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-[#172B4D]">
                        Sensor placement study
                    </p>
                    <p className="text-sm text-[#718096] mt-1">
                        All 28 possible pairs are listed below. No pair has been selected
                        as the best configuration because experimental ranking results
                        are not available yet.
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#718096] text-sm">
                        <Network className="w-4 h-4" />
                        Possible sensor pairs
                    </div>
                    <p className="text-3xl font-bold text-[#172B4D] mt-2">28</p>
                    <p className="text-xs text-[#718096] mt-1">
                        Combinations from 8 locations
                    </p>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#718096] text-sm">
                        <Database className="w-4 h-4" />
                        Evaluation results
                    </div>
                    <p className="text-3xl font-bold text-[#172B4D] mt-2">
                        {hasResults ? rankingData?.results.length : '0'}
                    </p>
                    <p className="text-xs text-[#718096] mt-1">
                        Experimental results loaded
                    </p>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#718096] text-sm">
                        <Award className="w-4 h-4" />
                        Selected best pair
                    </div>
                    <p className="text-xl font-bold text-[#E87532] mt-3">
                        Not decided
                    </p>
                    <p className="text-xs text-[#718096] mt-1">
                        Pending placement study
                    </p>
                </div>
            </div>

            {/* Pair Ranking Table */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="p-5 border-b border-[#E5E7EB]">
                    <h2 className="text-lg font-semibold text-[#172B4D]">
                        All 28 Sensor Combinations
                    </h2>
                    <p className="text-sm text-[#718096] mt-1">
                        Lower RMSE indicates lower prediction error.
                    </p>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-sm text-[#718096]">
                        Loading ranking results...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#F7F8FA] text-[#172B4D]">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">Pair</th>
                                    <th className="px-5 py-3 font-semibold">Sensor 1</th>
                                    <th className="px-5 py-3 font-semibold">Sensor 2</th>
                                    <th className="px-5 py-3 font-semibold">KAM RMSE</th>
                                    <th className="px-5 py-3 font-semibold">KFM RMSE</th>
                                    <th className="px-5 py-3 font-semibold">Combined RMSE</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#E5E7EB]">
                                {ALL_PAIRS.map((pair, index) => {
                                    const result = getResult(pair.sensorA, pair.sensorB);

                                    return (
                                        <tr
                                            key={`${pair.sensorA}-${pair.sensorB}`}
                                            className="hover:bg-[#F7F8FA]"
                                        >
                                            <td className="px-5 py-3 font-medium text-[#172B4D]">
                                                {index + 1}
                                            </td>
                                            <td className="px-5 py-3 text-[#475569]">
                                                {pair.sensorA}
                                            </td>
                                            <td className="px-5 py-3 text-[#475569]">
                                                {pair.sensorB}
                                            </td>
                                            <td className="px-5 py-3 text-[#475569]">
                                                {formatMetric(result?.kamRmse)}
                                            </td>
                                            <td className="px-5 py-3 text-[#475569]">
                                                {formatMetric(result?.kfmRmse)}
                                            </td>
                                            <td className="px-5 py-3 text-[#475569]">
                                                {formatMetric(result?.combinedRmse)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !hasResults && (
                    <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F8FA]">
                        <p className="text-sm text-[#718096] text-center">
                            No experimental ranking results yet. Metrics will appear here
                            when the results file becomes available.
                        </p>
                    </div>
                )}
            </section>

            {/* Reference Configurations */}
            <section className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-[#E87532]" />
                    <h2 className="text-lg font-semibold text-[#172B4D]">
                        Reference Configurations
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA]">
                        <p className="font-semibold text-[#172B4D]">
                            Thigh + Shank
                        </p>
                        <p className="text-xs text-[#E87532] font-medium mt-1">
                            Original plan · Reference only
                        </p>
                        <p className="text-sm text-[#718096] mt-2">
                            The initially proposed two-sensor arrangement. Exact body
                            placement remains undecided.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA]">
                        <p className="font-semibold text-[#172B4D]">
                            All 8 IMUs
                        </p>
                        <p className="text-xs text-[#E87532] font-medium mt-1">
                            Baseline reference
                        </p>
                        <p className="text-sm text-[#718096] mt-2">
                            Full sensor configuration used as a reference for evaluating
                            reduced-sensor configurations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Data Source */}
            <div className="text-xs text-[#718096]">
                Data source: {rankingData?.source || 'No experimental results loaded'}
                {rankingData?.units && ` · RMSE units: ${rankingData.units}`}
            </div>
        </div>
    );
};

export default SensorPairRanking;