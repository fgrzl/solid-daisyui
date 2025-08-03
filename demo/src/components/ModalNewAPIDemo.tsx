import { createSignal } from "solid-js";
import { modal } from "../../../src/components/modal";

/**
 * Demo showcasing the new Modal API with backdrop/box structure
 * and modal.cancel/modal.confirm components.
 */
export default function ModalNewAPIDemo() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [deleteResult, setDeleteResult] = createSignal("");

  const handleDelete = () => {
    setDeleteResult("User deleted successfully!");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDeleteResult("Action cancelled");
  };

  return (
    <div class="p-8 space-y-4">
      <h2 class="text-2xl font-bold mb-4">Modal - New Backdrop/Box API Demo</h2>
      
      <div class="space-y-4">
        <button 
          class="btn btn-error" 
          onClick={() => setIsOpen(true)}
        >
          Delete User
        </button>
        
        {deleteResult() && (
          <div class="alert alert-info">
            <span>{deleteResult()}</span>
          </div>
        )}
      </div>

      {/* New Modal API using backdrop/box structure */}
      <modal.backdrop 
        isOpen={isOpen()} 
        onClose={() => setIsOpen(false)}
        variant="middle"
      >
        <modal.box size="md">
          <modal.title>Delete User</modal.title>
          <modal.description>
            This action cannot be undone. Are you sure you want to continue?
          </modal.description>
          
          <modal.actions>
            <modal.cancel onClick={handleCancel}>
              Cancel
            </modal.cancel>
            <modal.confirm 
              variant="danger" 
              onClick={handleDelete}
            >
              Delete
            </modal.confirm>
          </modal.actions>
        </modal.box>
      </modal.backdrop>

      {/* Code Example */}
      <div class="mockup-code">
        <pre data-prefix="$"><code>{'<modal.backdrop isOpen={isOpen()} onClose={() => setIsOpen(false)}>'}</code></pre>
        <pre data-prefix="  "><code>{'<modal.box>'}</code></pre>
        <pre data-prefix="    "><code>{'<modal.title>Delete User</modal.title>'}</code></pre>
        <pre data-prefix="    "><code>{'<modal.description>This action cannot be undone...</modal.description>'}</code></pre>
        <pre data-prefix="    "><code>{'<modal.actions>'}</code></pre>
        <pre data-prefix="      "><code>{'<modal.cancel>Cancel</modal.cancel>'}</code></pre>
        <pre data-prefix="      "><code>{'<modal.confirm variant="danger">Delete</modal.confirm>'}</code></pre>
        <pre data-prefix="    "><code>{'</modal.actions>'}</code></pre>
        <pre data-prefix="  "><code>{'</modal.box>'}</code></pre>
        <pre data-prefix="$"><code>{'</modal.backdrop>'}</code></pre>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-bold mb-2">Generated HTML Structure:</h3>
        <div class="mockup-code text-sm">
          <pre data-prefix=""><code>{'<div class="modal modal-open modal-middle">'}</code></pre>
          <pre data-prefix="  "><code>{'<div class="modal-box">'}</code></pre>
          <pre data-prefix="    "><code>{'<h3 class="font-bold text-lg">Delete User</h3>'}</code></pre>
          <pre data-prefix="    "><code>{'<p class="py-4">This action cannot be undone...</p>'}</code></pre>
          <pre data-prefix="    "><code>{'<div class="modal-action">'}</code></pre>
          <pre data-prefix="      "><code>{'<form method="dialog">'}</code></pre>
          <pre data-prefix="        "><code>{'<button class="btn btn-outline">Cancel</button>'}</code></pre>
          <pre data-prefix="      "><code>{'</form>'}</code></pre>
          <pre data-prefix="      "><code>{'<button class="btn btn-error">Delete</button>'}</code></pre>
          <pre data-prefix="    "><code>{'</div>'}</code></pre>
          <pre data-prefix="  "><code>{'</div>'}</code></pre>
          <pre data-prefix="  "><code>{'<form method="dialog" class="modal-backdrop">'}</code></pre>
          <pre data-prefix="    "><code>{'<button>Close</button>'}</code></pre>
          <pre data-prefix="  "><code>{'</form>'}</code></pre>
          <pre data-prefix=""></"><code>{'</div>'}</code></pre>
        </div>
      </div>
    </div>
  );
}