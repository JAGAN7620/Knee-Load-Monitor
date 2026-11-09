import {
    PersonOption,
    KneeMomentDataPoint,
} from '../types';

interface ReplayStep {
    kam_true: number[];
    kam_est: number[];
    kfm_true: number[];
    kfm_est: number[];
}

interface ReplaySubject {
    id: string;
    steps: ReplayStep[];
}

interface ReplayFile {
    source: string;
    model: string;
    units: string;
    subjects: ReplaySubject[];
}

export interface ReplayDataResult {
    data: KneeMomentDataPoint[];
    source: string;
    model: string;
    isSampleData: boolean;
}

export async function loadReplayData(
    person: PersonOption,
    stepNumber: number
): Promise<ReplayDataResult | null> {
    try {
        const response = await fetch('/replay_data.json');

        if (!response.ok) {
            return null;
        }

        const replayFile: ReplayFile = await response.json();

        const subjectIndex =
            person === 'Sample person A' ? 0 :
                person === 'Sample person B' ? 1 : 2;

        const subject = replayFile.subjects[subjectIndex];
        const step = subject?.steps[stepNumber - 1];

        if (!step) {
            return null;
        }

        const arrays = [
            step.kam_true,
            step.kam_est,
            step.kfm_true,
            step.kfm_est,
        ];

        const validArrays = arrays.every(
            (arr) =>
                Array.isArray(arr) &&
                arr.length === 101 &&
                arr.every((value) => Number.isFinite(value))
        );

        if (!validArrays) {
            return null;
        }

        if (replayFile.units !== '%BW·BH') {
            return null;
        }

        const data: KneeMomentDataPoint[] = step.kam_true.map(
            (_, index) => ({
                stancePercent: index,
                labKAM: step.kam_true[index],
                modelKAM: step.kam_est[index],
                labKFM: step.kfm_true[index],
                modelKFM: step.kfm_est[index],
            })
        );

        return {
            data,
            source: replayFile.source,
            model: replayFile.model,
            isSampleData: false,
        };
    } catch (error) {
        console.warn('Replay data unavailable. Using sample curves.', error);
        return null;
    }
}