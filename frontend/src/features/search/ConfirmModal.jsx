
export const ConfirmModal = ({onConfirm, onCancel, coverArt, title, artist, explicit}) => {
    return (
        <div>
            <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Are you sure you want to play?</h2>
                    <div className="flex">
                        <img src={coverArt} alt={`${title} cover art`} className="w-16 h-16 mr-4" />
                        <div>
                            <p className="font-semibold">{title}</p>
                            <p className="text-sm text-gray-600">{artist}</p>
                            {explicit && <span className="text-xs text-red-500">Explicit</span>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={() => onCancel()}>Cancel</button>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={() => onConfirm()}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}